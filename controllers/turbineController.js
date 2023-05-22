import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Turbine from "../models/turbineModel.js";
import Axios from "axios";
import jwt from "jsonwebtoken";

const getUsers = asyncHandler(async (req, res) => {
  console.log("Henter brukere");
  const usersFound = await User.find({}).sort({ username: 1 }); //
  return res.status(200).json(usersFound);
});

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
const changeTurbineState = asyncHandler(async (req, res) => {

  const token = req.cookies.jwt;
	let userId

	if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
			userId = decoded.userId;
		} 
		catch (error) {
      res.status(401).json({Error: "Not Authorized, token failed."});
      throw new Error("Not authorized, token failed");
    }
  } 
	else {
    res.status(401).json({Error: "Not Authorized, no token."});
    throw new Error("Not authorized, no token");
  }

  // hente id
  const turbineId = turbines[req.body.turbineNr - 1];
  const { capacityUsage } = req.body;

  const url = `https://solvann.azurewebsites.net/api/Turbines/${ turbineId }?capacityUsage=${capacityUsage}`;
  const config = {
    headers: {
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

  // endre status
  const statusChange = await Axios.put(url, {}, config)
    .catch((err) => console.log(err));

  // lagre ny status i db og hvem som har endra.
	const turbine = await Turbine.create({
		turbineNr: req.body.turbineNr,
		capacityUsage: capacityUsage,
		userId: userId,
	});
  
  if(statusChange){
		if(turbine){
			res.status(200).json({ msg: `Turbine ${ req.body.turbineNr }: ${ capacityUsage }`});
		}
		else{
			res.status(400).json({ Error: "Status changed, but there were problems logging the changes."});
			throw new Error('Status changed, but there were problems logging the changes.');
		}
	}
	else {
		res.status(400).json({ Error: "Unable to change status."});
		throw new Error('Unable to change status.')
	}
});

const turnOffAll = asyncHandler(async (req, res) => {

	const token = req.cookies.jwt;
	let userId;

	if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
			userId = decoded.userId;
		} 
		catch (error) {
      res.status(401).json({ Error: "Not authorized, token failed"});
      throw new Error("Not authorized, token failed.");
    }
  } 
	else {
    res.status(401).json({ Error: "Not authorized, no token."});
    throw new Error("Not authorized, no token");
  }

  const config = {
    headers: {
      GroupId: process.env.SOLVANN_USER,
      GroupKey: process.env.SOLVANN_PASSWORD,
    },
  };

	const capacityUsage = 0;

  for(let i = 0; i < 6; i++){
    const statusChange = await Axios.put(
    	`https://solvann.azurewebsites.net/api/Turbines/${ turbines[i] }?capacityUsage=${ capacityUsage }`,
    	{}, 
    	config
  	);

		const turbine = await Turbine.create({
			turbineNr: i,
			capacityUsage: capacityUsage,
			userId: userId,
		});

		if(!(statusChange || turbine)) {
			res.status(400).json({ Error: "There were problems changing status and/or logging said changes."})
			throw new Error('There were problems changing status and/or logging said changes.');
		}
  }	
	res.status(200).json({ msg: "ok."});
});

export { 
    changeTurbineState,
    turnOffAll
};
