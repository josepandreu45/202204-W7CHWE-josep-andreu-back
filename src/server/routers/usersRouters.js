const express = require("express");
const multer = require("multer");
const path = require("path");
const { loginUser, registerUser } = require("../controllers/usersControllers");

const router = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
});

router.post("/login", loginUser);
router.post("/register", upload.single("image"), registerUser);

module.exports = router;
