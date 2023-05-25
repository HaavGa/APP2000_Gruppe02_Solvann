import asyncHandler from "express-async-handler";
import { waterLevelModel as waterLevel } from "../models/waterLevelModel.js";
import Axios from "axios";

const noe = asyncHandler(async (req, res) => {

  const config = {
    headers: {
      Accept: 'application/json',
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    }
  };
  
  /*
  
  
  
  */

  // ------------------ Her er det matematikk og forutsetninger, sensor ---------------------------

  // Number of turbines
  const numTurbines = 6;

  // Maksimal mengde vann gjennom en turbin enten man suger inn eller spyler ut. Gitt i oppgaven
  // [ m^3/s ]
  const maxFlowRate = 41.4; 

  // Mengde energi en turbin kan produsere per kubikkmeter. Gitt i oppgaven
  // [ kWh/m^3 ]
  const energyProduction = 1.3;

  // Maksimal mengde energi en turbin kan produsere.
  // [ kWh/s ]
  const maxEnergyProduction = energyProduction * maxFlowRate; // Dette blir 53.82

  // Total mengde energy alle turbiner kan produsere per sekund
  // [ kWh/s ]
  const maxEnergyProductionAll = maxEnergyProduction * numTurbines // Dette blir 322.92



  // Mengde vann som kan suges inn per energienhet. Gitt i oppgaven.
  // [ m^3/kWh ]
  const numCubicMeterPerKiloWatt = 2; 

  // maksimal energibruk for én turbin ved full "trøkk".
  // [ kWh/s ]
  const maxEnergyConsumption = maxFlowRate / numCubicMeterPerKiloWatt // Dette blir 20.7

  // maksimal energibruk for alle turbiner ved full "trøkk".
  // [ kWh/s ]
  const maxEnergyConsumptionAll = maxEnergyConsumption * numTurbines // Dette blir 124.2



  // Pris i nok per mega watt timer. Gitt i oppgaven.
  // [ NOK/MWh ]
  const avgPowerPrice = 515; 

  // Om solvann suger inn vann i reservoaret i én time, til gjennomsnittspris.
  // 3600 er antall sekunder i en time
  // Vi deler strømprisen på tusen for å få kWh
  // [ NOK ]
  const avgExspenseOneHour = maxEnergyConsumptionAll * 3600 * avgPowerPrice/1000; // Dette blir 230266.8

  // Om solvann produserer strøm i én time til gjennommsnittspris.
  // [ NOK ]
  const avgEarningOneHour = maxEnergyProductionAll * 3600 * avgPowerPrice/1000; // Dette blir 598693.68

  // Ta
  const totalEarningOneHour = avgEarningOneHour - avgExspenseOneHour; // Dette blir 368426.88

  const efficiency = totalEarningOneHour / avgEarningOneHour


  

  // -------------------------------------------------------------------------------------------------

  // Skal solvann selge strøm for å så tjene penger på å selge strømmen igjen til gjennomsnittspris?
  // Dette med et energitap på 10% og strømpris slik den er nå. Det er opp til operatør å avgjøre
  // om trenden i strømpris vil vare.


  // å kjøpe strøm nå for å selge til gjennomsnittpris vil lønne seg.
  //const buy = solarAll.data[0] > 

  // sell


  // Ved samme trend (lik waterInflux og flowRate) vil reservoaret nå øvre/nedre grense om x min.



  // spørre om bruker vil avbryte automatisk endring av turbinstatus ved overstigning av optimal vannstand




  // fortelle om de kan forvente nedgang eller økning i strømpris



  // penger som blir tjent akkurat nå ved gitt strømpris. Her må jeg ta hensyn til slitasjen.






  
  //res.status(200).json(turbineStates.data[0].capacityUsage);
  //res.status(200).json({ msg: "ok" });





  // strømpris er høy && vannstand er høy 
  // -> blast ut

  // strømpris er lav && vannstand er lav
  // -> blast inn

  // forutse periode med antatt lav strømpris?


  // Jeg regner med at det koster store summer å snu retningen på turbinene og at ikke det skjer på sekundet. Er et tap der også.


  // det koster penger å suge inn. hvor mange timer med strømpris 50% av gjennomsnittet må til for å selge med gevinst til gjennomsnittpris.
  

  //if(natt && høyStrømpris && over35m )

  // vannstand er waterLevel fra groupstate * 1 000 0000 m^3
  // Det står at hver turbin kan ta imot 41.4 m^3/s. regner da med at vanntapet i reservoaret fra en turbin er 41.4m^3/s
  // vanntapet fra alle turbiner på maks kapasitet er 41.4m^3/s * 6 = 248.4 m^3/s

















/*
  {
    sun24: [
      verdiTime1,
      verdiTime2,
      ...
      verdiTime24
    ],
    power24: [
      verdiTime1,
      verdiTime2,
      ...
      verdiTime24
    ],
    waterlevel24: [
      verdiTime1,
      verdiTime2,
      ...
      verdiTime24
    ],
    moneyEarned: Number,
    enviromentalCorst: Number,
    waterLevelChange: Number,
    flowRate: Number
  }

*/

});

const reservoarStatus = asyncHandler(async (req, res) => {

  const config = {
    headers: {
      Accept: 'application/json',
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    }
  };

  const turbineStates = await Axios.get(
    'https://solvann.azurewebsites.net/api/Turbines',
    config, 
  )
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } 
    else if (error.request) {
      console.log(error.request);
    } 
    else {
      console.log('Error', error.message);
    }
  });
  

  const groupState = await Axios.get(
    'https://solvann.azurewebsites.net/api/GroupState',
    config, 
  )
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } 
    else if (error.request) {
      console.log(error.request);
    } 
    else {
      console.log('Error', error.message);
    }
  });

  const powerPriceAll = await Axios.get(
    'https://solvann.azurewebsites.net/api/PowerPrice/all',
    config, 
  )
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } 
    else if (error.request) {
      console.log(error.request);
    } 
    else {
      console.log('Error', error.message);
    }
  });
  
  const solarAll = await Axios.get(
    'https://solvann.azurewebsites.net/api/Solar/all',
    config, 
  )
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } 
    else if (error.request) {
      console.log(error.request);
    } 
    else {
      console.log('Error', error.message);
    }
  });

  const waterInfluxAll = await Axios.get(
    'https://solvann.azurewebsites.net/api/WaterInflux/all',
    config, 
  )
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } 
    else if (error.request) {
      console.log(error.request);
    } 
    else {
      console.log('Error', error.message);
    }
  });


  res.status(200).json({
    turbineState: [
      turbineStates.data[0].capacityUsage,
      turbineStates.data[1].capacityUsage,
      turbineStates.data[2].capacityUsage,
      turbineStates.data[3].capacityUsage,
      turbineStates.data[4].capacityUsage,
      turbineStates.data[5].capacityUsage,
    ],
    money: groupState.data.money,
    waterLevel: groupState.data.waterLevel,
    environmentCost: groupState.data.environmentCost,
    power: turbineStates.data[0].capacityUsage * 41.4 * 1.3, // kWh/s
    powerPrice: powerPriceAll.data[solarAll.data.length-1],
    solar: solarAll.data[solarAll.data.length-1],
    waterInflux: waterInfluxAll.data[waterInfluxAll.data.length-1],


  });

});


// @desc    Fetch measurement
// @route   GET /api/water/last
// @access  Private
const fetchWaterLevel = asyncHandler(async (req, res) => {
  const waterData = await Axios.get(
    "https://solvann.azurewebsites.net/api/WaterInflux"
  );
  console.log(waterData.data);

  const lastMeasurement = { level: waterData.data };
  console.log(lastMeasurement);

  if (!lastMeasurement.level) {
    res.status(400).json({ msg: "no ok. "});
    throw new Error("No waterlevel.");
  }
  await waterLevel.create(lastMeasurement);
  res.status(200).json({ msg: "ok" });
});

export {
  fetchWaterLevel,
  noe,
  reservoarStatus,
};
