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
const {
  validateUser,
  isLogged,
  isAdmin,
} = require("../middlewares/validateUser");

userRoutes.get("/get", getUsers);

userRoutes.post("/register", createUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logOut", logOut);

userRoutes.get("/me", validateUser, (req, res) => {
  res.status(200).send(...req.user);
});

userRoutes.post("/favorites/add/:id", isLogged, addFavorites);

userRoutes.delete("/favorites/delete/:id", isLogged, deleteFavorite);

userRoutes.get("/getOne/:id", isLogged, getOneUser);

userRoutes.delete("/delete/:id", isAdmin, deleteUser);

module.exports = userRoutes;
