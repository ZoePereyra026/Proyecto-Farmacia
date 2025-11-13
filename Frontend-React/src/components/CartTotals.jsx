import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartTotals({ subtotal, total, money, clearCart, handleCheckout }) {
  const navigate = useNavigate()
  const confirmarVaciado = () => {
    if (window.confirm('¿Desea vaciar su carrito?')) {
      clearCart();
      window.dispatchEvent(new Event('carritoActualizado'));
    }
  };

  const emitirComprobante = () => {
    navigate('/confirmacion'); 
  };

  return (
    <section className="total">
      <div className="resumen-precios">
        <p><strong>Subtotal:</strong> <span>{money(subtotal)}</span></p>
        <h2><strong>Total:</strong> <span>{money(total)}</span></h2>
      </div>

      <div className="acciones">
        <div className="boton-wrapper">
          <button id="btnClearCart" onClick={confirmarVaciado}>
            Vaciar carrito
          </button>
        </div>
        <div className="boton-wrapper">
          <button className="boton-pago" onClick={emitirComprobante}>
            Emitir comprobante
          </button>
        </div>
      </div>
    </section>
  );
}
