const express = require("express");
const propertiesRoutes = express.Router();
const {
  getProperty,
  getOneProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/properties.controllers");

propertiesRoutes.get("/getAll", getProperty);

propertiesRoutes.get("/get/:id", getOneProperty);

propertiesRoutes.post("/create", createProperty);

propertiesRoutes.put("/update/:id", updateProperty);

propertiesRoutes.delete("/delete/:id", deleteProperty);

module.exports = propertiesRoutes;
