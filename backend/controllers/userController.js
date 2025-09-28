const Usuario = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔐 Función para generar el token
const crearToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Registro de usuario
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "El usuario, email y contraseña son obligatorios" });
  }

  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "El rol debe ser 'user' o 'admin'" });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ error: "Ya existe un usuario con ese correo electrónico" });
    }

    const nuevoUsuario = await Usuario.create({
      username,
      email,
      password,
      role: role || "user"
    });

    const token = crearToken(nuevoUsuario);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario: {
        _id: nuevoUsuario._id,
        username: nuevoUsuario.username,
        email: nuevoUsuario.email,
        role: nuevoUsuario.role
      },
      token
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({
      error: "Error interno al registrar usuario",
      detalle: error.message
    });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "El Usuario no ha sido encontrado" });
    }

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = crearToken(usuario);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        _id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        role: usuario.role
      },
      token
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno en el inicio de sesión" });
  }
};

module.exports = {
  registerUser,
  loginUser
};
