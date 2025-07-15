const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const MIN_PASSWORD_LENGTH = 6;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res
      .status(400)
      .json({ message: "Invalid request. Missing required fields." });
    return;
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await usersModel.create(newUser);

    return res.status(201).json({
      user: {
        name: createdUser.name,
        email: createdUser.email,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ message: "User not created" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  try {
    const dbUser = await usersModel.findOne({ email: email });

    if (!dbUser) {
      return res.status(401).send({ message: "Invalid email" });
    }

    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const user = {
      name: dbUser.name,
      email: dbUser.email,
      preferences: dbUser.preferences,
    };

    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });

    delete dbUser.password;
    return res.status(200).send({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
