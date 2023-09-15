const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("./index");

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: "3h" });
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_TOKEN);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
