const Producto = require("../models/productoModels");

// Calcular el subtotal de los productos en el carrito
function calcularSubtotal(productos) {
  let subtotal = 0;
  productos.forEach(item => {
    if (item.producto && item.producto.precio) {
      subtotal += item.producto.precio * item.cantidad;
    }
  });
  return subtotal;
}

// Calcular precios finales con descuento
function calcularPrecios(subtotal, descuento = 0) {
  const totalConDescuento = (subtotal * (100 - descuento)) / 100;
  return {
    subtotal: subtotal.toFixed(2),
    descuento: `${descuento}%`,
    totalFinal: totalConDescuento.toFixed(2)
  };
}

// Validar stock de productos solicitados
async function validarStock(productosSolicitados) {
  const errores = [];
  const productosValidados = [];

  for (const item of productosSolicitados) {
    const productoBD = await Producto.findById(item.producto);

    if (!productoBD) {
      errores.push({
        producto: item.producto,
        mensaje: "Producto no existe en la Base de Datos de la Farmacia"
      });
      continue;
    }

    if (productoBD.stock < item.cantidad) {
      errores.push({
        producto: item.producto,
        mensaje: `Stock insuficiente (Disponible: ${productoBD.stock}, Solicitado: ${item.cantidad})`
      });
    } else {
      productosValidados.push(item);
    }
  }

  return { productosValidados, errores };
}

module.exports = {
  calcularSubtotal,
  calcularPrecios,
  validarStock
};
