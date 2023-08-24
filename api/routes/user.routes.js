const express = require("express");
const userRoutes = express.Router();
const {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
} = require("../controllers/user.controllers");

userRoutes.get("/", getUsers);

userRoutes.post("/register", createUser);

userRoutes.get("/getOne/:id", getOneUser);

userRoutes.delete("/delete/:id", deleteUser);

module.exports = userRoutes;
