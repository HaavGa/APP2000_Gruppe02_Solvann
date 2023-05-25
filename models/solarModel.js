import mongoose from "mongoose";

const solarSchema = mongoose.Schema({
  avgOutput: {
    type: Number,
    required: [true, "Please add water level."],
  },
  date: {
    type: String,
    default: new Date(),
  },
});

const Solar = mongoose.model("Solar", solarSchema);

export default Solar;
