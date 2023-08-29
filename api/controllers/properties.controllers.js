const EstateModel = require("../schemas/Estate");

const createProperty = (req, res) => {
  const property = new EstateModel(req.body);
  property
    .save()
    .then((property) => res.status(200).send(property))
    .catch((err) => res.status(404).send(err));
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
