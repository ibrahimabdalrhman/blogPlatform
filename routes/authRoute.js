const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

// router.get("/forget-password", postController.getPostById);

// router.put("/reset-code", postController.updatePost);

// router.delete("/reset-password", postController.deletePost);

module.exports = router;
