import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
      });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};

const registerUser = async (req, res) => {
  const { userName, email, password, name } = req.body;

  if (!userName || !email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existingUser) {
      const conflictField = existingUser.email === email ? "Email" : "Username";
      return res.status(409).json({
        success: false,
        message: `${conflictField} already exists`,
      });
    }

    const hashedPassword = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS) || 10
    );

    const newUser = new User({
      userName,
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("toke").json({
    success: true,
    message: "User logged out successfully",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
