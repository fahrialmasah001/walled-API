const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controllers");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/users", userController.getAllUsers);
router.post("/auth/register", userController.createUser);
router.post("/auth/login", userController.login);
router.get("/profile", authenticateToken, userController.getUserById);

module.exports = router;
