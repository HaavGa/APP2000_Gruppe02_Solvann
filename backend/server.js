import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import { connectDB } from "./config/db.js";
const port = process.env.PORT || 5000;
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";
import vannstandRoute from "./routes/vannstandRoutes.js";

mongoose.set("strictQuery", false);
connectDB();
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: false}))
app.use(errorHandler);
app.use("/api/version/users", userRoute);
app.use("/api/version/vannstand", vannstandRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));

// app.get('/turbine/:turbineId/:status', (req, res) => { eksempel på shit
