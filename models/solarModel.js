import mongoose from "mongoose";

/**
 * @author Emil Waldemar Strand
 * @desc model for solar-collection
 */
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
