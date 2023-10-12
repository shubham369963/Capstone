import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";
import {hashPassword, comparePassword} from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) =>{
    try{
        const {name, email, password, phone, address, answer} = req.body;

        if(!name){
            return res.send({message: "Name is Required"});
        }
        if(!email){
            return res.send({message: "Email is Required"});
        }
        if(!password){
            return res.send({message: "Password is Required"});
        }
        if(!phone){
            return res.send({message: "Phone Number is Required"});
        }
        if(!address){
            return res.send({message: "Address is Required"});
        }

        if(!answer){
            return res.send({message: "Answer is Required"});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name, email, password:hashedPassword, phone, address, answer}).save();
        const id = user._id;
        res.status(201).send({
            success: true,
            message: "User Register Successfull",
            id,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        })
    }
}

export const ImageRegisterController = async(req, res) =>{
    try{
        const {image, email} = req.body;
        console.log(image)

        const extUser = await userModel.findOne({email});
        if(extUser){
            return res.status(200).send({
                success: true,
                extUser,
            })
        }

        // const hashedPassword = await hashPassword(password);

        const user = await new imageModel({image, user: extUser._id}).save();

        res.status(201).send({
            success: true,
            message: "Face Recognition Successfully",
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Face Recognition",
            error,
        })
    }
}

export const loginController = async(req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.status(404).send({
                success: false,
                message: "Invalid Credentials",
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not Registered",
            })
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }

        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).send({
            success: true,
            message: "Login Successfull",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        })
    }
}

export const forgotPasswordController = async(req, res)=>{
    try{
        const {email, newPassword,answer} = req.body;

        if(!email){
            return res.send({message: "Email is Required"});
        }

        if(!answer){
            return res.send({message: "Answer is Required"});
        }

        if(!newPassword){
            return res.send({message: "New Password is Required"});
        }

        const user = await userModel.findOne({email, answer});

        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer",
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {
            password: hashedPassword
        });

        res.status(200).send({
            success: true,
            message: "Password Reset Successfull",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error,
        })
    }
}

export const testController = (req, res)=>{
    res.send(`protected route`);
}

