import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import waterLevelRoutes from "./routes/waterLevelRoutes.js";

const port = process.env.PORT || 5000;

dotenv.config();
const app = express();
console.log(process.env.MONGO_URI);
mongoose.set("strictQuery", false);
connectDB();

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({extended: false}))
app.use(errorHandler);
app.use("/api/version/users", userRoutes);
app.use("/api/version/waterLevel", waterLevelRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));