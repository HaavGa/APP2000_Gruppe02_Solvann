import asyncHandler from "express-async-handler";
import { vannstandModel as vannstand } from "../models/vannstandModel.js";
import mongoose from "mongoose";

// @desc    Get all users
// @route   GET /api/version
// @access  Private
const getVannstand = asyncHandler(async (req, res) => {
  console.log("Henter alle målinger");
  const vannstandFound = await vannstand
    .find({})
    .sort({ createdAt: -1 });
  res.status(200).json(vannstandFound);
});

// @desc    Set user
// @route   POST /api/version/users/
// @access  Private
const setVannstand = asyncHandler(async (req, res) => {
  console.log(req.body);

  const newVannstand = req.body;

  if (!newVannstand.niva) {
    res.status(400);
    throw new Error("Please add water level.");
  }
  await vannstand.create(newVannstand);
  res.status(200).json(newVannstand);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateVannstand = asyncHandler(async (req, res) => {
  console.log("Oppdaterer vannnivå. Hvorfor gjør du dette?");
  //const vannstandId = await vannstand.findById(req.params.id)
  if (!(await vannstand.findById(req.params.id))) {
    res.status(400);
    throw new Error("Vannstand not found.");
  }
  const updatedVannstand = await vannstand.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ updatedVannstand });
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteVannstand = asyncHandler(async (req, res) => {
  const user = await vannstand.findById(req.params.id);
  if (!vannstand) {
    res.status(400);
    throw new Error("User not found.");
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
});

export {
  getVannstand,
  setVannstand,
  updateVannstand,
  deleteVannstand,
};
