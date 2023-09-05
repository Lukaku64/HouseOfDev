const express = require("express");
const multer = require("multer");
const propertiesRoutes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  getProperty,
  getOneProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  filterProperties,
} = require("../controllers/properties.controllers");

propertiesRoutes.get("/getAll", getProperty);

propertiesRoutes.get("/get/:id", getOneProperty);

propertiesRoutes.get("/filter", filterProperties);

propertiesRoutes.post("/create", upload.single("images"), createProperty);

propertiesRoutes.put("/update/:id", updateProperty);

propertiesRoutes.delete("/delete/:id", deleteProperty);

module.exports = propertiesRoutes;
