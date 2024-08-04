import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//Function to Create Account
export const Register = async (req, res, next) => {
  const { name, emailid, password, phoneNumber, confirmpassword } = req.body;
  if (!name || !phoneNumber || !emailid || !password || !confirmpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      emailid,
      password: hashedPassword,
      phoneNumber,
      confirmpassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

// Function to login account
export const SignIn = async (req, res, next) => {
  try {
    // Find user by email ID
    const user = await User.findOne({ emailid: req.body.emailid });
    if (!user) return next(createError(404, "User not found!"));

    // Compare the password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });
    const { password, ...others } = user._doc;

    // Send response with token and user data
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        userId: user._id,
        accessToken: token,
      });

    /*res.status(200).json({
              message: 'Logged in successfully',
              token, // Include the token in the response
              user: others
            });*/
  } catch (err) {
    next(err);
  }
};
