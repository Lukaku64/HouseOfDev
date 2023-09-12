const EstateModel = require("../schemas/Estate");
const crypto = require("crypto");
const sendEmail = require("../utils/date");
const confirmMail = require("../utils/confirmDate");
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

const createDate = (req, res) => {
  const propertyId = req.params.id;
  const { date, hour, userId } = req.body;
  EstateModel.findById(propertyId)
    .then((property) => {
      if (!property) res.status(404).send("No existe la propiedad");

      property.date.push({ date, hour, user: userId });
      sendEmail(userId);
      property.save();
    })
    .then(() => res.status(201).send("Agendado con exito"))
    .catch((err) => {
      res.status(404).send(err);
    });
};

const confirmDate = (req, res) => {
  const propertyId = req.params.id;
  const { confirm, dateId } = req.body;
  EstateModel.findById(propertyId)
    .then((property) => {
      if (!property) res.status(404).send("No existe la propiedad");
      const object = property.date.find((e) => e._id == dateId);
      object.confirm = confirm;
      confirmMail(object.user, propertyId, dateId);
      property.save();
      res.status(201).send("Cita confirmada");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const postReview = (req, res) => {
  const propertyId = req.params.id;
  const { comments, stars, userId } = req.body;
  EstateModel.findById(propertyId)
    .then((property) => {
      if (!property) res.status(404).send("No existe la propieda");
      property.reviews.push({ comments, stars, user: userId });
      const average = property.reviews.reduce(
        (acc, value) => acc + value.stars,
        0
      );
      property.averageRating =
        average > 0 ? average / property.reviews.length : 0;
      property.save();
      res.status(201).send("Review posteada");
    })
    .catch((err) => res.status(404).send(err));
};

const getReviews = (req, res) => {
  const propertyId = req.params.id;
  EstateModel.findById(propertyId, "averageRating reviews")
    .populate({ path: "reviews.user", select: "name lastName" })
    .then((property) => {
      if (!property) res.status(404).send("No existe la propiedad");
      res.status(200).json(property);
    })
    .catch((err) => res.status(404).send(err));
};

const getProperty = (req, res) => {
  EstateModel.find()
    .populate({
      path: "date.user",
      select: "name lastName email",
    })
    .then((property) => {
      if (property.length === 0)
        res.status(404).send("No hay ninguna propiedad");
      else res.status(201).send(property);
    })
    .catch((err) => res.status(404).send(err));
};

const filterProperties = (req, res) => {
  const { state, address } = req.query;

  const filter = {};
  const regex = new RegExp(address, "i");
  console.log("address", address);
  if (state) filter.state = state;
  if (address) filter.address = address;

  EstateModel.find(filter)
    .then((property) => res.status(201).send(property))
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
  filterProperties,
  createDate,
  confirmDate,
  postReview,
  getReviews,
};
