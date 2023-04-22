import asyncHandler from "express-async-handler";
import { waterLevelModel as waterLevel } from "../models/waterLevelModel.js";
import Axios from "axios";
//import mongoose from "mongoose";

// @desc    Get all measurements of water level
// @route   GET /api/version/waterLevel/
// @access  Private
const getWaterLevel = asyncHandler(async (req, res) => {
  console.log("Henter alle målinger");
  const waterLevelFound = await waterLevel.find({}).sort({ createdAt: -1 });
  res.status(200).json(waterLevelFound);
});

// @desc    Set measurement
// @route   POST /api/version/waterLevel/
// @access  Private
const setWaterLevel = asyncHandler(async (req, res) => {
  console.log(req.body);

  const newWaterLevel = req.body;

  if (!newWaterLevel.level) {
    res.status(400);
    throw new Error("Please add water level.");
  }
  await waterLevel.create(newWaterLevel);
  res.status(200).json(newWaterLevel);
});

// @desc    Update measurement
// @route   FETCH /api/version/waterLevel/:id
// @access  Private
const updateWaterLevel = asyncHandler(async (req, res) => {
  console.log("Oppdaterer måling.");
  if (!(await waterLevel.findById(req.params.id))) {
    res.status(400);
    throw new Error("Measurement not found.");
  }
  const updatedWaterLevel = await waterLevel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ updateWaterLevel });
});

// @desc    Delete measurement
// @route   DELETE /api/version/waterLevel/:id
// @access  Private
const deleteWaterLevel = asyncHandler(async (req, res) => {
  const waterLevelFound = await waterLevel.findById(req.params.id);
  if (!waterLevelFound) {
    res.status(400);
    throw new Error("User not found.");
  }

  await waterLevelFound.remove();

  res.status(200).json({ id: req.params.id });
});

const fetchWaterLevel = asyncHandler(async (req, res) => {
  const waterData = await Axios.get(
    "https://solvann.azurewebsites.net/api/WaterInflux"
  );
  console.log(waterData.data);

  const lastMeasurement = { level: waterData.data };
  console.log(lastMeasurement);
  
  if (!lastMeasurement.level) {
    res.status(400);
    throw new Error("No waterlevel.");
  }
  await waterLevel.create(lastMeasurement);

});

setInterval(fetchWaterLevel, 43200000);

export { getWaterLevel, setWaterLevel, updateWaterLevel, deleteWaterLevel, fetchWaterLevel };