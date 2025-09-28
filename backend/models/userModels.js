const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, { timestamps: true });

// Encriptar contraseña antes de guardarla en la base de datos
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const { connUsuario } = require("../config/database");
const Usuario = connUsuario.model("Usuario", UsuarioSchema, "usuarios");


module.exports = Usuario;
