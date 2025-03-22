const User = require("../models/userModel");
const Address = require("../models/addressModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");

//signup
exports.signup = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { name, email, password, mobile, profilePic, role } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "all fields required" });
    }

    const userExist = await User.findOne({ email: email });
    console.log("userExisttttt", userExist);
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      profilePic,
      role,
    });
    await newUser.save();
    console.log("newUser", newUser);
    const token = generateToken(newUser, "user");
    res.cookie("token", token);

    res.json({ message: " SignIn successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = generateToken(userExist, "user");
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      // maxAge: 60 * 60 * 1000,
    });

    res.json({ message: " Login succssfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Profile
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Retrieve user profile excluding password
    const userProfile = await User.findById(userId).select("-password");

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve user addresses
    const userAddresses = await Address.find({ user: userId });

    // Combine user profile and addresses
    res.json({
      message: "Profile fetched successfully",
      data: {
        profile: userProfile,
        addresses: userAddresses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//RestPassword
exports.resetPassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old password and new password are required" });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//Logout
exports.logout = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update-profile
exports.profileUpdate = async (req, res) => {
  try {
    const { name, email, phone, profilePic } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, profilePic },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//checkUser
exports.checkUser = async (req, res, next) => {
  try {
    res.json({ message: "user autherized" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

//deleteAccount
exports.deleteUserAccount = async (req, res) => {
  try {
    res.clearCookie("token");
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
