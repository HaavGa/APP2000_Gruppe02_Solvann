import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Turbine from "../models/turbineModel.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const turbines = [
  "f6730322-fac6-405c-a754-04313942bc31",
  "77234f52-a0b3-4dae-9cc5-99b8c7361a5c",
  "d8fe79b3-8f2d-4bd0-a587-0ce56158e05d",
  "6389edce-3769-4a05-a63e-e9c8f78ffdd7",
  "4808353b-1408-4488-89d6-4a648c9b74cb",
  "eacabb78-6203-4e8f-bb7f-f696e86816ca",
];

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const setTurbine = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(401).json({ Error: "Not authorized, no userId." });
    throw new Error("Not authorized, no userId.");
  }

  // hente id
  const turbineNr = req.params.turbineNr;
  const turbineId = turbines[turbineNr - 1];
  const capacityUsage = req.body.capacityUsage;

  const url = `https://solvann.azurewebsites.net/api/Turbines/${turbineId}?capacityUsage=${capacityUsage}`;
  const config = {
    headers: {
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  // endre status
  const statusChange = await axios
    .put(url, {}, config)
    .catch(err => console.log(err));

  // lagre ny status i db og hvem som har endra.
  const turbine = await Turbine.create({
    turbineNr: turbineNr,
    capacityUsage: capacityUsage,
    userId: userId,
  });

  if (statusChange) {
    if (turbine) {
      res
        .status(200)
        .json({ msg: `Turbine ${turbineNr}: ${capacityUsage}` });
    } else {
      res
        .status(400)
        .json({
          Error:
            "Status changed, but there were problems logging the changes.",
        });
      throw new Error(
        "Status changed, but there were problems logging the changes."
      );
    }
  } else {
    res.status(400).json({ Error: "Unable to change status." });
    throw new Error("Unable to change status.");
  }
});

const setAll = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(401).json({ Error: "Not authorized, no userId." });
    throw new Error("Not authorized, no userId.");
  }

  // autensisering mot solvann sitt API
  const config = {
    headers: {
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  const capacityUsage = req.body.capacityUsage;

  // slår av alle seks turbiner
  for (let i = 0; i < turbines.length; i++) {
    const statusChange = await axios.put(
      `https://solvann.azurewebsites.net/api/Turbines/${turbines[i]}?capacityUsage=${capacityUsage}`,
      {},
      config
    );

    // Kode for å logge dette i databasen
    const turbine = await Turbine.create({
      turbineNr: i + 1,
      capacityUsage: capacityUsage,
      userId: userId,
    });

    if (!(statusChange || turbine)) {
      res
        .status(400)
        .json({
          Error:
            "There were problems changing status and/or logging said changes.",
        });
      throw new Error(
        "There were problems changing status and/or logging said changes."
      );
    }
  }
  res.status(200).json({ msg: "ok." });
});

const getAll = asyncHandler(async (req, res) => {
  const changeLog = await Turbine.find({});
  if (!changeLog) {
    res.status(404);
    throw new Error("No logs found");
  }
  res.status(200).json(changeLog);
});

export { setTurbine, setAll, getAll };
