const express = require("express");
const userRoutes = express.Router();
const {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  loginUser,
  logOut,
  addFavorites,
  deleteFavorite,
} = require("../controllers/user.controllers");
const validateUser = require("../middlewares/validateUser");

userRoutes.get("/get", getUsers);

userRoutes.post("/register", createUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logOut", logOut);

userRoutes.get("/me", validateUser, (req, res) => {
  res.status(200).send(...req.user);
});

userRoutes.post("/favorites/add/:id", addFavorites);

userRoutes.delete("/favorites/delete/:id", deleteFavorite);

userRoutes.get("/getOne/:id", getOneUser);

userRoutes.delete("/delete/:id", deleteUser);

module.exports = userRoutes;
