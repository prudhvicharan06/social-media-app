import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// JWT_SECRET is used to sign the token, it should be kept secret and not shared with anyone



// Register

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (!existingUser) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
  
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
    
    // Q: in this sign method what if i give key as Id instead of userId
    // Ans: it will not work because in the authmiddleware we are using userId to get the user from the token



    // Q: what is existingUser._id? 
    // Ans: it is the id of the user that we are signing the token with
    // beacause of this userId name error initially its "Id" but in the authmiddleware we are using "userId" so we need to change it to "userId"

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: existingUser._id, name: existingUser.name, email: existingUser.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
