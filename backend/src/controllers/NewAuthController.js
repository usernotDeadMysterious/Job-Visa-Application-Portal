import { AuthUserModel } from "../models/AuthUserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await AuthUserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User Already Exist..",
        success: false,
      });
    }

    const newUser = new AuthUserModel({ name, email, password});
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({
      message: "User signup Successfull",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const {  email, password } = req.body;
    const ErrorMsg = "Email or Password is wrong!"
    const user = await AuthUserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: ErrorMsg,
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password,user.password)

    if(!isPassEqual){
        return res.status(403).json({
        message: ErrorMsg,
        success: false,
      }); 
    }
    const jwtToken = jwt.sign(
      { email:user.email, _id: user._id },
      process.env.JWT_SECRET,
      {expiresIn:'24h'},

    )
    res.status(201).json({
      message: "User login Successfull",
      success: true,
      jwtToken,
      email,
      name:user.name,
      role:user.role,
      hasActiveAccess:user.hasActiveAccess,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export { signup,login };
