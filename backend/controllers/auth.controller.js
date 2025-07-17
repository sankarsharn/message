import User from '../models/User.Schema.js';
import { errorHandler } from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return errorHandler(new Error('All fields are required', 400), next);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorHandler(new Error('User already exists', 400), next);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    return errorHandler(error, next);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorHandler(new Error('All fields are required', 400), next);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return errorHandler(new Error('User not found', 404), next);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorHandler(new Error('Invalid password', 401), next);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ user, token });
  } catch (error) {
    return errorHandler(error, next);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
};
