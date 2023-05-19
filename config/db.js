import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // this takes in our URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    // Exit'er med status 1 ved feil.
    process.exit(1);
  }
};

export { connectDB };
