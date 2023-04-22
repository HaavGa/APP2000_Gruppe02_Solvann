import mongoose from "mongoose";

const Schema = mongoose.Schema;

const waterLevelSchema = new Schema({
  level: {
    type: Number,
    required: [true, "Please add water level."],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

export const waterLevelModel = mongoose.model("waterlevel", waterLevelSchema);