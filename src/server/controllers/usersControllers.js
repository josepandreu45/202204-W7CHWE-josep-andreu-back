require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const debug = require("debug")("socialnetwork:controllers");
const User = require("../../database/models/User");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error();
    error.statusCode = 401;
    error.customMessage = "usuario o contraseña incorrectos";

    next(error);
  } else {
    const userData = {
      id: user.id,
      username: user.username,
    };

    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = new Error();
      error.statusCode = 401;
      error.customMessage = "usuario o contraseña incorrectos";

      next(error);
    } else {
      const token = jwt.sign(userData, process.env.JWT_SECRET);
      res.status(200).json({ token });
    }
  }
};

const encryptPassword = (password) => bcrypt.hash(password, 10);

const registerUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  const { file } = req;
  const user = await User.findOne({ username });

  if (user) {
    const error = new Error();
    error.statusCode = 409;
    error.customMessage = "this user already exists";

    next(error);
  }

  const newImage = `${Date.now()}${file.originalname}`;

  fs.rename(
    path.join("uploads", "images", file.filename),
    path.join("uploads", "images", newImage),
    async (error) => {
      if (error) {
        debug("hola");
        next(error);
      } else {
        debug("file renamed");
      }
    }
  );

  const encryptedPassword = await encryptPassword(password);

  try {
    const newUser = await User.create({
      name,
      username,
      password: encryptedPassword,
      image: path.join("images", newImage),
    });

    res.status(201).json(newUser);
  } catch {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "bad request";
    next(error);
  }
};

module.exports = { loginUser, registerUser };
