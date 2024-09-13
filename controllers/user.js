// Importing required modules
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

// Function to register a new user
const register = async (req, res) => {
  const { password, ...others } = req.body; // Extract password and other user details
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

  const newUser = new userModel({ ...others, password: hashedPassword }); // Create a new user instance with hashed password
  try {
    // Save the new user to the database
    const savedUser = await newUser.save();
    // Send a success response with the saved user data
    res.json({
      message: "Account created successfully",
      user: savedUser,
    });
  } catch (error) {
    // Send an error response if there's an exception
    res.json({ message: error.message });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Check if the user exists in the database
    const userInfo = await userModel.findOne({ email });
    if (!userInfo) {
      return res.json({ message: "User not found" });
    }

    // Verify the provided password with the stored hashed password
    const verify = bcrypt.compareSync(password, userInfo.password);
    if (!verify) {
      return res.json({ message: "Password does not match" });
    }

    // Send a success response with the user information
    res.json({
      message: `Welcome ${userInfo.username}, you are now logged in`,
      user: userInfo,
    });
  } catch (error) {
    // Send an error response if there's an exception
    res.json({ message: error.message });
  }
};

// Exporting all functions for use in other parts of the application
module.exports = {
  register,
  loginUser,
};
