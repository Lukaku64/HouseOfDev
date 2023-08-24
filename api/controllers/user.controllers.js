const UserModel = require("../schemas/User");

const createUser = (req, res) => {
  const user = new UserModel(req.body);
  user
    .save()
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      res.status(400).send(`El usuario no pudo crearse, error: ${err}`)
    );
};

const getUsers = (req, res) => {
  UserModel.find()
    .then((user) => {
      if (user.length == 0) res.status(404).send("No se encontraron usuarios");
      else res.status(201).send(user);
    })
    .catch((err) => {
      res.status(404).send(`Error al obtener los usuarios, ${err}`);
    });
};

const getOneUser = (req, res) => {
  const userId = req.params.id;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) res.status(403).send("Usuario no encontrado");
      else res.status(201).send(user);
    })
    .catch((err) =>
      res.status(404).send("Ocurrio un error al traer al usuario")
    );
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  UserModel.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) res.status(404).send("Usuario no encontrado");
      else res.status(201).send("Usuario eliminado");
    })
    .catch((err) =>
      res.status(403).send(`Error al eliminar un usuario, error: ${err}`)
    );
};

module.exports = {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
};
