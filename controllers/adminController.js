import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Turbine from "../models/turbineModel.js";
import Axios from "axios";
import jwt from "jsonwebtoken";

const makeAdmin = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        res.status(400).json({ Error: "Could not find user."});
        throw new Error("Could not find user.");
    }

    const admin = await Admin.findOne({ email });

    if(admin){
        res.status(400).json({ msg: "User is already admin."});
        throw new Error("User is already admin.")
    }

    const newAdmin = await Admin.create({
        userId: user._id,
    })

    res.status(200).json({ userId: newAdmin.userId });

});

const makeNotAdmin = asyncHandler(async (req, res) => { // IKKE FERDIG!
    
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        res.status(400).json({ Error: "Could not find user."});
        throw new Error("Could not find user.");
    }

    const admin = await Admin.findOne({ email });

    if(admin){
        res.status(400).json({ msg: "User is already admin."});
        throw new Error("User is already admin.")
    }

    const newAdmin = await Admin.create({
        userId: user._id,
    })

    res.status(200).json({ userId: newAdmin.userId });
});

export { 
    makeAdmin
};
