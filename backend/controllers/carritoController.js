const Carrito = require("../models/carritoModels");

// Obtener todos los carritos
const obtenerCarritos = async (req, res) => {
  try {
    const carritos = await Carrito.find()
      .populate("usuario", "username email role")  // Mostrar datos del Usuario
      .populate("productos.producto", "nombre precio fabricante categoria"); // Mostrar datos del Producto

    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerCarritos
};
