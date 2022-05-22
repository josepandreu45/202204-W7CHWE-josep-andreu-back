const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      res.status(201).json({ token });
    }
  }
};

module.exports = { loginUser };
