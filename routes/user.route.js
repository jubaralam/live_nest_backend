const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.mode");

// register route
userRouter.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    if (!name || !email || !username || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const isRegistered = await UserModel.findOne({ email });
    if (isRegistered) {
      return res
        .status(409)
        .send({ message: "Your email is already registered! Please Login" });
    }
    const isUserNameRegistered = await UserModel.findOne({ username });
    if (isUserNameRegistered) {
      return res
        .status(409)
        .send({ message: "username is already registered! " });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = UserModel({
      name,
      email,
      username,
      password: hashPass,
    });
    await user.save();

    res
      .status(201)
      .send({ message: "You have been Registered successfully", data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Login 
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Email not found! please check once and try again" });
    }
    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res.status(404).send({ message: "Wrong Credential" });
    }

    const token = jwt.sign({ id: user._id }, process.env.secretKey);

    res
      .status(200)
      .send({ message: "You have LoggedIn Successfully", token: token, user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = userRouter;
