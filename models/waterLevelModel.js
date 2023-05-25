import mongoose from "mongoose";

const waterLevelSchema = mongoose.Schema({
  waterLevel: {
    type: Number,
    required: [true, "Please add water level."],
  },
  dato: {
    type: String,
    required: [true, "Vennligst fyll ut dato. [yyyy m(m) d(d)]"],
  },
  time: {
    type: Number,
    required: [true, "Vennligst fyll inn time"],
  },
});

const WaterLevel = mongoose.model("WaterLevel", waterLevelSchema);

export default WaterLevel;
