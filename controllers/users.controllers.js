const Joi = require("joi");
const userService = require("../services/users.service");
const { UserResponse } = require("../dto/userResponse");

const registerSchema = Joi.object({
  nama: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  no_hp: Joi.string().required(),
});

const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await userService.createUser(value);
    res.status(201).json({ data: new UserResponse(user) });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = await userService.login(value);
    res.status(200).json({ data: { token: token } });
  } catch (error) {
    if (error.message === "404") {
      return res.status(404).json({ message: "user doesn't exist" });
    }

    if (error.message === "401") {
      return res.status(401).json({ message: "email or password not valid" });
    }
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.getUserById(Number(id));
    res.status(200).json({ data: new UserResponse(user) });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { createUser, getUserById, findAllUsers, login };
