import mongoose from "mongoose";
import bcrypt, { hash } from 'bcrypt';

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

// static signup method
userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });
  if(exists){
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;

}

export const userModel = mongoose.model("user", userSchema);