const EstateModel = require("../schemas/Estate");
const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const createProperty = (req, res) => {
  const property = new EstateModel(req.body);
  const random = randomImageName();
  const uploadFile = (file) => {
    const { buffer, mimetype } = file;
    const params = {
      Bucket: bucketName,
      Key: `property-images/${random}`,
      Body: buffer,
      ContentType: mimetype,
    };
    const command = new PutObjectCommand(params);

    return s3.send(command);
  };
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  if (req.file) {
    uploadFile(req.file)
      .then(() => {
        property.images.push(
          `https://${bucketName}.s3.amazonaws.com/property-images/${random}`
        );
        return property.save();
      })
      .then((savedProperty) => {
        res.status(200).send(savedProperty);
      })
      .catch((err) => {
        console.log("error first", err);
        res.status(404).send(err);
      });
  } else {
    property
      .save()
      .then((savedProperty) => {
        res.status(200).send(savedProperty);
      })
      .catch((err) => {
        console.log("error second", err);
        res.status(404).send(err);
      });
  }
};

const getProperty = (req, res) => {
  EstateModel.find()
    .then((property) => {
      if (property.length === 0)
        res.status(404).send("No hay ninguna propiedad");
      else res.status(201).send(property);
    })
    .catch((err) => res.status(404).send(err));
};

const getOneProperty = (req, res) => {
  const propertyId = req.params.id;
  EstateModel.findById(propertyId)
    .then((property) => {
      if (!property) res.status(404).send("No existe esa propiedad");
      else res.status(201).send(property);
    })
    .catch((err) => res.status(404).send(err));
};

const updateProperty = (req, res) => {
  const propertyId = req.params.id;
  EstateModel.findByIdAndUpdate(propertyId, req.body)
    .then((property) => {
      if (!property) res.status(404).send("No se pudo actualizar");
      else res.status(201).send(property);
    })
    .catch((err) => res.status(404).send(err));
};

const deleteProperty = (req, res) => {
  const propertyId = req.params.id;
  EstateModel.findByIdAndDelete(propertyId)
    .then((property) => {
      if (!property) res.status(404).send("Propiedad no encontrada");
      else res.status(204).send("Propiedad eliminada");
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  getProperty,
  getOneProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};
