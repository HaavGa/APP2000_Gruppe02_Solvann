import asyncHandler from "express-async-handler";
import { waterLevelModel as waterLevel } from "../models/waterLevelModel.js";
import Axios from "axios";

const noe = asyncHandler(async (req, res) => {

  const url = "https://solvann.azurewebsites.net/api/GroupState";
  const config = {
    headers: {
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  // endre status
  const groupState = await Axios.get(url, {}, config)
    .catch((err) => console.log(err));

  res.status(200).json(groupState);

  // strømpris er høy && vannstand er høy 
  // -> blast ut

  // strømpris er lav && vannstand er lav
  // -> blast inn

  // forutse periode med antatt lav strømpris?

  // regne ut når man treffer øvre eller nedre grense ved current flow rate.

  //if(natt && høyStrømpris && over35m )


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
};
