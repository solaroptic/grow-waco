import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { Token } from "../models/TokenModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = async (req, res) => {
  //SIGNUP body.user
  try {
    const { userName, email, password, industry } = req.body;

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: passwordHash,
      industry,
    });
    const savedUser = await newUser.save();

    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/auth/${savedUser._id}/verify/${token.token}`;
    await sendEmail(savedUser.email, "Email Verification", url);
    res.status(201).json({
      message: "An email has been sent to your address. Please verify to login",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User not found." });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid login" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        const token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/auth/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Email Verification", url);
      }
      res.status(201).json({
        message:
          "An email has been sent to your address. Please verify to login",
      });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "Invalid link" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: "Invalid token" });
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { verified: true } }
    );
    await token.deleteOne();
    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
