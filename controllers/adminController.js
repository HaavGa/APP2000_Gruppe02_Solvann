import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Turbine from "../models/turbineModel.js";
import Axios from "axios";
import jwt from "jsonwebtoken";

const getAdmin = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const adminFound = await Admin.findOne({ id })

    if(!adminFound){
        res.status(404).json({ isAdmin: false});
    }

    res.status(200).json({ isAdmin: true });
});

const makeAdmin = asyncHandler(async (req, res) => {
    
    const { id } = req.body;
    console.log(id);
    const user = await User.findById({ _id: id });
    console.log(user);

    if(!user){
        res.status(400).json({ Error: "Could not find user."});
        throw new Error("Could not find user.");
    }

    const admin = await Admin.findOne({ userId: user.id });

    if(admin){
        res.status(400).json({ msg: "User is already admin."});
        throw new Error("User is already admin.")
    }
    
    const newAdmin = await Admin.create({
        userId: user._id,
    })
    
    res.status(200).json({ userId: newAdmin.userId });

});

const makeNotAdmin = asyncHandler(async (req, res) => {
    
    const { userId } = req.body;
    const admin = await Admin.findOne({ userId });

    if(!admin){
        res.status(400).json({ Error: "Could not find user."});
        throw new Error("Could not find user.");
    }

    const removedAdmin = await Admin.remove({
        userId: admin.userId,
    })    

    res.status(200).json({ removedAdmin });
});

export {
    getAdmin,
    makeAdmin,
    makeNotAdmin,
};
