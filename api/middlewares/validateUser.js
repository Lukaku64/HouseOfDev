const { validateToken } = require("../config/tokens");

const validateUser = (req, res, next) => {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;

  if (payload !== null) {
    return next();
  }
  res.send("Por favor inicia sesion");
};

const isLogged = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Primero inicia sesion");
  }
  next();
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;
  if (req.user?.role !== "admin") {
    return res.status(403).send("Acceso no autorizado");
  }
  next();
};

const isAdminOrAgent = (req, res, next) => {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;
  if (req.user?.role !== "admin" || req.user?.role !== "agente") {
    return res.status(403).send("Acceso no autorizado");
  }
  next();
};

module.exports = { validateUser, isLogged, isAdmin, isAdminOrAgent };
