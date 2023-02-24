import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name."],
    },
    email: {
      type: String,
      required: [true, "Please add an email."],
    },
    password: {
      type: String,
      required: [true, "Please add a password."],
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
//hello