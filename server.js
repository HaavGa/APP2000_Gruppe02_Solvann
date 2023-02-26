import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import waterLevelRoutes from "./routes/waterLevelRoutes.js";

dotenv.config();

const app = express();

mongoose.set("strictQuery", false);
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))

app.use(errorHandler);
app.use("/api/version/users", userRoutes);
app.use("/api/version/waterLevel", waterLevelRoutes);

app.use(express.static(path.join(__dirname, "./client/")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));