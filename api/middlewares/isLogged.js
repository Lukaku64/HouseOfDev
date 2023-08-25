const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config");

const isLogged = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send("Debe iniciar sesion para continuar");
  }
  jwt
    .verify(token, SECRET_TOKEN)
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch(() => res.status(404).send("Token de autenticación inválido"));
};

module.exports = isLogged;
