import express from "express";
import User from "../Model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json("User Already Exist");
    }

    console.log("hii");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(name, email, password, phoneNumber);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });


    const savedUser = await user.save();
    console.log("user: ", savedUser);
    console.log("hii2");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid Credential");
    }
    const passMatched = await bcrypt.compare(password, user.password);
    if (!passMatched) {
      return res.status(401).json("Invalid Credential");
    }
    console.log("Login")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/login/success", (req, res) => {
  // console.log("Login Successful", req.user);
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  console.log("Login Failed");
  res.status(401).json({
    error: true,
    message: "Login failed",
  });
});

router.get("/logout", (req, res) => {
  console.log("Logout");
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session = null;
    res.redirect(process.env.client_url);
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.redirect(process.env.client_url);
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

export default router;
