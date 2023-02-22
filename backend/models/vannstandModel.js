import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vannstandSchema = new Schema(
  {
    niva: {
      type: Number,
      required: [true, "Please add water level."],
    },
  },
  {
    timestamps: true,
  }
);

export const vannstandModel = mongoose.model(
  "vannstand",
  vannstandSchema
);
