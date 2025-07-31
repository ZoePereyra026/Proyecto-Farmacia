const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    const usuario = req.usuario;
    if (usuario.rol !== rolRequerido) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }
    next();
  };
};

module.exports = {
  verificarToken,
  verificarRol
};
