const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("./index");

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: "3h" });
};

const validateToken = (token) => {
  return jwt
    .verify(token, SECRET_TOKEN)
    .then((decodeToken) => decodeToken)
    .catch((err) => console.log(err));
};

module.exports = {
  generateToken,
  validateToken,
};
