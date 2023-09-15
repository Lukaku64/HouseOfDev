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
const {
  isAdmin,
  isAdminOrAgent,
  isLogged,
} = require("../middlewares/validateUser");

propertiesRoutes.get("/getAll", getProperty);

propertiesRoutes.get("/get/:id", getOneProperty);

propertiesRoutes.get("/filter", filterProperties);

propertiesRoutes.post(
  "/create",
  isAdmin,
  upload.single("images"),
  createProperty
);

propertiesRoutes.post("/date/:id", isLogged, createDate);

propertiesRoutes.post("/date/confirm/:id", isAdminOrAgent, confirmDate);

propertiesRoutes.post("/review/:id/post", isLogged, postReview);

propertiesRoutes.get("/review/:id/get", getReviews);

propertiesRoutes.put("/update/:id", isAdmin, updateProperty);

propertiesRoutes.delete("/delete/:id", isAdminOrAgent, deleteProperty);

module.exports = propertiesRoutes;
