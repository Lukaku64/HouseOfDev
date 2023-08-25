const { validateToken } = require("../config/tokens");

const validateUser = (req, res, next) => {
  let token = req.cookies.token;
  let payload = validateToken(token);
  req.user = payload;

  if (payload !== null) {
    return next();
  }
  res.send("Por favor inicia sesion");
};

module.exports = validateUser;
