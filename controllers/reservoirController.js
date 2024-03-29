import asyncHandler from "express-async-handler";
import WaterLevel from "../models/waterLevelModel.js";
import Solar from "../models/solarModel.js";
import axios from "axios";
import generateToken from "../utils/generateToken.js";

/**
 * @author Emil Waldemar Strand
 * Denne fila inneholder metoder knytta til reservoaret.
 */

/**
 * @desc Blir brukt til å oppdatere siden "Grafer".
 * Kobler seg opp mot solvann API og henter ut opplysninger.
 * Behandler data om nødvendig, gjør beregninger og
 * returnerer til frontend.
 * @route GET /api/reservoir/updateGraphs
 * @access Private
 */
const updateGraphs = asyncHandler(async (req, res) => {
  const config = {
    headers: {
      Accept: "application/json",
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };
  //-------------- Groupstate ---------------
  const groupState = await axios
    .get("https://solvann.azurewebsites.net/api/GroupState", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  //------------ solarAll ---------------------

  const solarAll = await axios
    .get("https://solvann.azurewebsites.net/api/Solar/all", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  //------------ PowerPriceAll-------------

  const powerPriceAll = await axios
    .get(
      "https://solvann.azurewebsites.net/api/PowerPrice/all",
      config
    )
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  //------------ WaterlevelArray --------------

  const waterlevelAll = await WaterLevel.find({}).sort({ date: -1 });

  let waterLevels = [];
  let tidspunkt = 0;

  for (let i = 0; i < waterlevelAll.length - 1; i++) {
    tidspunkt = waterlevelAll[i].date.getHours();
    const maling = waterlevelAll[i].waterLevel;

    if (waterlevelAll[i].date.getMinutes() > 45) tidspunkt++;

    waterLevels.push({
      maling,
    });
  }

  for (let i = 0; i < waterlevelAll.length - 1; i++) {
    const maling = waterlevelAll[i].waterLevel;
    waterLevels[i] = maling;
  }

  waterLevels = getMeasurements(waterLevels);

  //-------------- waterInflux ---------------------
  const waterInflux = await axios
    .get("https://solvann.azurewebsites.net/api/WaterInflux", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  //--------- turbine states -----------------

  const turbineStates = await axios
    .get("https://solvann.azurewebsites.net/api/Turbines", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  //---------------buy/sell--------------------
  // Tips på når det lønner seg å selge kraft. Vi har gått ut ifra at etterspørsel henger
  // sammen med strømpris fordi dette er den eneste måten vi kan måle det på.

  // OBS! Her har jeg satt grenser og tall selv. Dette kan alltids justeres og er blitt satt
  // kun som eksempel.

  const avgPowerPrice = 515; // [NOK/MWh]
  const powerThreshold = 1.1;
  const maxSolarProduction = 20; // [kWh / s]
  const highWaterLevel = 33; // [m]

  const powerPriceNow =
    powerPriceAll.data[powerPriceAll.data.length - 1];
  const solarProdNow = solarAll.data[solarAll.data.length - 1];
  const waterLevelNow = groupState.data.waterLevel;

  // Selge
  const sellPowerPrice =
    powerPriceNow > avgPowerPrice * powerThreshold; // hvis strømpris er 10% over gjennomsnittet
  const sellSolar = solarProdNow < maxSolarProduction / 2; // hvis solcellene produserer under 50% av maks kapasitet.
  const sellWaterLevel = waterLevelNow > highWaterLevel; // Er det mye vann i reservoiret.

  // Kjøpe
  const buyPowerPrice =
    powerPriceNow < avgPowerPrice * powerThreshold; // hvis strømpris er 10% under gjennosnittet.
  const buySolar = solarProdNow > (maxSolarProduction / 4) * 3; // Hvis solcellene produserer over 75% av maks kapasitet
  const buyWaterLevel = waterLevelNow < highWaterLevel;

  //---------- Hvor lang tid før reservoaret når øvre eller nedre grense ------

  let usageCapacityAll =
    turbineStates.data[0].capacityUsage +
    turbineStates.data[1].capacityUsage +
    turbineStates.data[2].capacityUsage +
    turbineStates.data[3].capacityUsage +
    turbineStates.data[4].capacityUsage +
    turbineStates.data[5].capacityUsage;

  const waterOut = usageCapacityAll * 41.4;

  // Hvor mye vann som går ut av reservoaret på en time.
  const totalChange = (waterInflux.data + waterOut) * 3600;
  const m3WaterInReservoar = groupState.data.waterLevel * 1000000;

  let outputTimeRemaining = [];

  // code 1 - Waterlevel is below 25m
  // code 2 - Waterlevel is above 40m
  // code 3 - Waterlevel is going down and reaching lower limit
  // code 4 - Waterlevel is going up and reaching upper limit.
  // code 5 - Waterlevel is completly stable.

  if (groupState.data.waterLevel < 25) {
    outputTimeRemaining.push({
      hoursRemaining: 0,
      code: 1,
    });
  } else if (groupState.data.waterLevel > 40) {
    outputTimeRemaining.push({
      hoursRemaining: 0,
      code: 2,
    });
  } else {
    if (totalChange > 0) {
      const m3AboveLowerLimit = m3WaterInReservoar - 25000000;
      const timeRemaining = m3AboveLowerLimit / totalChange;
      outputTimeRemaining.push({
        hoursRemaining: timeRemaining,
        code: 3,
      });
    } else if (totalChange < 0) {
      const m3AboveUpperLimit = 40000000 - m3WaterInReservoar;
      const timeRemaining = m3AboveUpperLimit / totalChange;
      outputTimeRemaining.push({
        hoursRemaining: timeRemaining,
        code: 4,
      });
    } else {
      outputTimeRemaining.push({
        hoursRemaining: 0,
        code: 5,
      });
    }
  }

  // -------------- Send -------------------
  res.status(200).json({
    vannstand: groupState.data.waterLevel,
    sell: sellPowerPrice && sellSolar && sellWaterLevel,
    buy: buyPowerPrice && buySolar && buyWaterLevel,
    vannEndring: outputTimeRemaining,
    vannstandArray: waterLevels,
    solar: getMeasurements(solarAll.data),
    powerPrice: getMeasurements(powerPriceAll.data),
  });
});

/**
 * @desc Blir brukt til å oppdatere siden "Hjem".
 * Kobler seg opp mot solvann API og henter ut opplysninger.
 * Behandler data om nødvendig, gjør beregninger og
 * returnerer til frontend.
 * @route GET /api/reservoir/updateHome
 * @access Private
 */
const updateHome = asyncHandler(async (req, res) => {
  //---------- Config -------------------
  const config = {
    headers: {
      Accept: "application/json",
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  //---------- groupState --------------

  const groupState = await axios
    .get("https://solvann.azurewebsites.net/api/GroupState", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  //-------------- waterInflux ---------------------
  const waterInflux = await axios
    .get("https://solvann.azurewebsites.net/api/WaterInflux", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  const turbineStates = await axios
    .get("https://solvann.azurewebsites.net/api/Turbines", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  let usageCapacityAll =
    turbineStates.data[0].capacityUsage +
    turbineStates.data[1].capacityUsage +
    turbineStates.data[2].capacityUsage +
    turbineStates.data[3].capacityUsage +
    turbineStates.data[4].capacityUsage +
    turbineStates.data[5].capacityUsage;

  const waterOut = usageCapacityAll * 41.4;
  const totalChange = (waterInflux.data + waterOut) * 3600;

  //---------------Send--------------------
  res.status(200).json({
    vannstand: groupState.data.waterLevel,
    pengerTjent: groupState.data.money,
    miljokostnader: groupState.data.environmentCost,
    turbinStatuser: turbineStates.data,
    vannInn: waterInflux.data,
    vannUt: waterOut,
    totalEndring: totalChange,
  });
});

/**
 * @desc Denne metoden er ment til å bli kjørt hver andre time
 * Den henter data fra solvann api, behandler og logger
 * i databasen. Den sjekker også vannstand og snur
 * turbinene om nødvendig for å holde vannstanden
 * innenfor optimale verdier.
 * @route GET /api/reservoir/log2Hour
 * @access Private
 */
const log2Hour = asyncHandler(async (req, res) => {
  const config = {
    headers: {
      Accept: "application/json",
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  const groupState = await axios
    .get("https://solvann.azurewebsites.net/api/GroupState", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  const vannstand = groupState.data.waterLevel;

  const maling = await WaterLevel.create({
    waterLevel: vannstand,
  });

  if (!maling) {
    res
      .status(400)
      .json({ msg: "Kunne ikke laste opp verdien til databasen!" });
    throw new Error("Kunne ikke laste opp verdien til databasen!");
  }

  generateToken(res, "646ff8f1b8ccc41f8446ecfd");

  const configSolvann = {
    headers: {
      Accept: "application/json",
      Cookie: `jwt=${res.token}`,
    },
  };

  const urlBouvet = "https://solvann.cyclic.app/api/turbine/";

  if (vannstand > 32) {
    await axios
      .post(urlBouvet, { capacityUsage: 0.08 }, configSolvann)
      .catch(err => console.log(err));
  } else {
    await axios
      .post(urlBouvet, { capacityUsage: -0.08 }, configSolvann)
      .catch(err => console.log(err));
  }

  res.status(200).json(maling);
});

/**
 * @desc Metoden er ment til å bli kjørt automatisk av cyclic hver
 * 24 time. Den henter ut data fra solvann API, behandler og
 * legger i databasen.
 * @route GET /api/reservoir/log24Hour
 * @access Private
 */
const log24Hour = asyncHandler(async (req, res) => {
  const config = {
    headers: {
      Accept: "application/json",
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  const solarAll = await axios
    .get("https://solvann.azurewebsites.net/api/Solar/all", config)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });

  let sum = 0;

  const solardata = solarAll.data;
  const lastValue = solardata.length - 1;

  for (let i = 0; i < 24; i++) sum += solardata[lastValue - i];

  const avg = sum / 24.0;

  const solar = await Solar.create({
    avgOutput: avg,
  });

  if (!solar) {
    res
      .status(400)
      .json({ msg: "Kunne ikke laste opp verdien til databasen!" });
    throw new Error("Kunne ikke laste opp verdien til databasen!");
  }

  res.status(200).json({ msg: "ok" });
});

/**
 * @desc Tar imot en array av målinger og returnerer en array
 * hvor målingene har tilknyttet tidspunkt.
 * @param {(number|Array)} array  ubehandlet data
 * @returns {(number|Array)}      behandlet data
 */
function getMeasurements(array) {
  const timer = new Date().getHours();
  const modulo = timer % 2;
  const startTime = timer - modulo;
  const startverdi = array.length - 1 - modulo;
  const antMaling = startTime / 2 + 12;

  let tidspunkt = startTime;
  let output = [];

  for (let i = 0; i < antMaling; i++) {
    //const time = tidspunkt
    const maling = array[startverdi - i * 2];

    output.push({
      tidspunkt,
      maling,
    });

    tidspunkt -= 2;
    if (tidspunkt < 0) tidspunkt = 22;
  }

  return output;
}

export { log2Hour, log24Hour, updateGraphs, updateHome };
