const express = require("express");
const routes = express.Router();
const userRoutes = require("./user.routes");
const propertiesRoutes = require("./properties.routes");

routes.use("/user", userRoutes);
routes.use("/properties", propertiesRoutes);

module.exports = routes;
