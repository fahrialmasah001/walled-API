const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controllers");
const { authenticateToken } = require("../middlewares/auth.middleware");

router.post("/auth/register", userController.createUser);
router.get("/profile", authenticateToken, userController.getUserById);
router.get("/users", userController.findAllUsers);
router.post("/auth/login", userController.login);

module.exports = router;