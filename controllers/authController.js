import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "./../helpers/authHelper.js";
import JWT from 'jsonwebtoken';

// Register Controller
export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        
        // Validation
        if (!name) {
            return res.status(400).send({message: 'Name is required'});
        }
        if (!email) {
            return res.status(400).send({message: 'Email is required'});
        }
        if (!password) {
            return res.status(400).send({message: 'Password is required'});
        }
        if (!phone) {
            return res.status(400).send({message: 'Phone is required'});
        }
        if (!address) {
            return res.status(400).send({message: 'Address is required'});
        }

        // Check existing user
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(200).send({
                error: 'User already exists',
                success: false
            });
        }


        // Register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save();
        
        // Registration success
        res.status(201).send({
            success: true,
            message: 'Registration successful',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error registering user',
            success: false,
            error
        });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check user
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid password'
            });
        }

        // Generate token
        const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error logging in user',
            error
        });
    }
};

//test
export const testController = (req, res) =>{
    res.send('protected route')
}
