import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * @author Brad Traversy
 * @desc model for brukere.
 * @source https://github.com/bradtraversy/mern-auth/blob/master/backend/models/userModel.js
 */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @author BradTraversy
 * @desc matcher hashet inntastet passord opp mot hashet passord i
 * databasen.
 * @source https://github.com/bradtraversy/mern-auth/blob/master/backend/models/userModel.js
 * @param {string} enteredPassword
 * @returns {boolean} om det matcher eller ikke
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * @author Brad Traversy
 * @desc Krypterer passord med Bcrypt.
 * @source https://github.com/bradtraversy/mern-auth/blob/master/backend/models/userModel.js
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
