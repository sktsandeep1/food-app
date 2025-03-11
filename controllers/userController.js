const userModel = require("../models/user.modal");

// login
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const login = await loginModel.findOne({
      userId,
      password,
      phone,
      verified: true,
    });
    res.status(200).send("Login Successful");
  } catch (error) {
    console.log(error);
  }
};

// register
const registerController = async (req, res) => {
  console.log("request dekhta hun");

  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send("New User Added Successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Error adding item", error });
  }
};

module.exports = { loginController, registerController };
