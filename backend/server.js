const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Ruta principal
app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a la API REST de eCommerc - Farmacia San Martín!" })
);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
