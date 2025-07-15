import User from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async(req, res , next) => {
    const {username , email , password} = req.body;
    
    if(!username || !email || !password){
            const error = new Error('All fields are required');
            error.statusCode = 400;
            return errorHandler(error, next);
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 400;
            return errorHandler(error, next);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user: savedUser, token });
    } catch (error) {
        errorHandler(error.statusCode || 500, error.message || 'Internal Server Error');
    }
}

export const login = async(req, res , next) => {
    const {email , password} = req.body;
    if(!email || !ppassword){
        const error = new Error('All fields are required');
        error.statusCode = 400;
        return errorHandler(error, next);
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            return errorHandler(error, next);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){   
            const error = new Error('Invalid password');
            error.statusCode = 401;
            return errorHandler(error, next);
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ user, token });
    } catch (error) {
        return errorHandler(error.statusCode || 500, error.message || 'Internal Server Error');
    }
}

export const signout = async(req, res , next) => {
    try {
    res.clearCookie("access_token").status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
}