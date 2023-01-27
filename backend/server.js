import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import UserModel from "./models/Users.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// connect to db
mongoose.set("strictQuery", false);
try {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@solvann.n4vazxp.mongodb.net/solvann?retryWrites=true&w=majority`
  );
} catch (err) {
  console.log(err);
}

app.get("/all-users", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/create-user", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
