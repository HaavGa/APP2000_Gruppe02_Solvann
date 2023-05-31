/**
 * @author Brad Traversy
 * @desc Koble til databasen ved hjelp av mongoose.
 * @source https://github.com/bradtraversy/mern-auth/blob/master/backend/config/db.js
 */

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
