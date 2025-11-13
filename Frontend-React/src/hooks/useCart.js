import { useState } from 'react';

export default function useCart() {
  // Estado local del carrito y totales
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Obtiene el carrito desde localStorage
  const getCart = () => {  
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  };

  // Guarda el carrito en localStorage y actualiza estado y totales
  const saveCart = (c) => {
    localStorage.setItem('cart', JSON.stringify(c));
    setCart(c);
    updateTotals(c);
    window.dispatchEvent(new Event('carritoActualizado')); // notifica cambios
  };

  // Calcula subtotal y total del carrito
  const updateTotals = (c) => {
    const sub = c.reduce((acc, it) => {
      const rawPrice = it.precio ?? it.price;
      const rawQty = it.qty;
      const price = isNaN(parseFloat(rawPrice)) ? 0 : parseFloat(rawPrice);
      const qty = isNaN(parseInt(rawQty)) ? 1 : parseInt(rawQty);
      return acc + price * qty;
    }, 0);

    setSubtotal(sub);
    setTotal(sub); // puede incluir impuestos en el futuro
  };

  // Cambia la cantidad de un producto en el carrito
  const setQty = (id, qty) => {
    const nuevaCantidad = parseInt(qty, 10) || 0;
    const actualizado = cart
      .map((item) =>
        String(item.id) === String(id)
          ? { ...item, qty: nuevaCantidad }
          : item
      )
      .filter((item) => item.qty > 0); // elimina si la cantidad es 0

    saveCart(actualizado);
  };

  // Elimina un producto del carrito
  const removeFromCart = (id) => {
    const filtered = cart.filter((item) => String(item.id) !== String(id));
    saveCart(filtered);
  };

  // Vacía el carrito completamente
  const clearCart = () => saveCart([]);

  // Formatea números como moneda argentina
  const money = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(n ?? 0);

  // Devuelve funciones y estados para usar en componentes
  return {
    cart,
    subtotal,
    total,
    setCart,
    getCart,
    saveCart,
    setQty,
    removeFromCart,
    clearCart,
    updateTotals,
    money,
  };
}

