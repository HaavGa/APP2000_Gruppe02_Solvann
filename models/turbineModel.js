import mongoose from "mongoose";

const turbineSchema = mongoose.Schema(
  {
    turbineNr: {
      type: Number,
      required: true,
    },
    capacityUsage: {
        type: Number, // double
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Turbine = mongoose.model('changeLogTurbine', turbineSchema);

export default Turbine;