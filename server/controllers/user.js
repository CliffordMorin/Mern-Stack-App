import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  //get something from the req.body and destructure the objects sent over
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    //if there is no matching email found in the database return
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    //else use bcrypt to hash the password and compare if the input password matches the password in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    //if the input password in not correct return
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    //else assign a json web token for the session
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmedPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    //if there is no matching email found in the database return
    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }
    if (password !== confirmedPassword) {
      res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
