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
  createDate,
  confirmDate,
  postReview,
  getReviews,
} = require("../controllers/properties.controllers");

propertiesRoutes.get("/getAll", getProperty);

propertiesRoutes.get("/get/:id", getOneProperty);

propertiesRoutes.get("/filter", filterProperties);

propertiesRoutes.post("/create", upload.single("images"), createProperty);

propertiesRoutes.post("/date/:id", createDate);

propertiesRoutes.post("/date/confirm/:id", confirmDate);

propertiesRoutes.post("/review/:id/post", postReview);

propertiesRoutes.get("/review/:id/get", getReviews);

propertiesRoutes.put("/update/:id", updateProperty);

propertiesRoutes.delete("/delete/:id", deleteProperty);

module.exports = propertiesRoutes;
