const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const { loginValidator, signupValidator } = require('../utils/validation/userValidator');

router.post("/signup",signupValidator, authController.signup);

router.post("/login", loginValidator,authController.login);

// router.get("/forget-password", postController.getPostById);

// router.put("/reset-code", postController.updatePost);

// router.delete("/reset-password", postController.deletePost);

module.exports = router;
