import mongoose from "mongoose";

const waterLevelSchema = mongoose.Schema({
  waterLevel: {
    type: Number,
    required: [true, "Please add water level."],
  },
  date: {
    type: Date,
    default: new Date(),
  }
});

const WaterLevel = mongoose.model("WaterLevel", waterLevelSchema);

export default WaterLevel;
