import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import waterLevelRoutes from "./routes/waterLevelRoutes.js";
import turbineRoutes from "./routes/turbineRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "https://solvann.cyclic.app/api/users/new",
      "https://solvann.cyclic.app",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/water", waterLevelRoutes);
app.use("/api/turbine", turbineRoutes);
app.use("/api/admin", adminRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "client", "dist", "index.html")
  )
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
