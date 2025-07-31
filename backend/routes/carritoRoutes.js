const express = require("express");
const router = express.Router();
const { obtenerCarritos } = require("../controllers/carritoController");

// Ruta para obtener todos los carritos
router.get("/", obtenerCarritos);

module.exports = router;
