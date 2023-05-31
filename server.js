import axios from "axios";
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
import reservoarRoutes from "./routes/reservoirRoutes.js";
import turbineRoutes from "./routes/turbineRoutes.js";
import cors from "cors";

/**
 * @author Brad Traversy, Emil Waldemar Strand, Håvard Garsrud
 */
const whitelist = [
  "http://localhost:3000",
  "https://solvann.cyclic.app",
];

const port = process.env.PORT || 5000;

connectDB();

const app = express();
axios.defaults.withCredentials = true;
app.options("*", cors());
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", [...whitelist]);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/reservoir", reservoarRoutes);
app.use("/api/turbine", turbineRoutes);

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
