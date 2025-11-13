import React from 'react';
import { useAuth } from '../hooks/useAuth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import '../../css/style_comprobante.css';

export default function Comprobante() {
  const { usuario } = useAuth();
  const navigate = useNavigate(); 

  const carrito = JSON.parse(localStorage.getItem('cart')) || [];
  const total = carrito.reduce((acc, item) => acc + item.precio * item.qty, 0);

  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();
  const nroTicket = Math.floor(Math.random() * 1000000);

  const exportarPDF = () => {
    const comprobante = document.getElementById('comprobante');

    html2canvas(comprobante).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('comprobante.pdf');

      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('carritoActualizado'));

      setTimeout(() => navigate('/carrito'), 1000);
    });
  };

  return (
    <div id="comprobante" className="comprobante-wrapper">
      <h2 className="comprobante-titulo">Comprobante de Compra</h2>

      <div className="comprobante-datos">
        <p><strong>ID de usuario:</strong> {usuario?.id}</p>
        <p><strong>Nombre:</strong> {usuario?.username || usuario?.nombre || usuario?.email}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>N° de ticket:</strong> #{nroTicket}</p>
      </div>

      <hr className="comprobante-separador" />

      <h4 className="comprobante-subtitulo">Productos comprados:</h4>
      <ul className="comprobante-lista">
        {carrito.map((item, i) => (
          <li key={i}>
            {item.nombre} — Cantidad: {item.qty} — Precio unitario: ${item.precio}
          </li>
        ))}
      </ul>

      <p className="comprobante-total">Total: ${total}</p>

      <p className="comprobante-gracias">
        Gracias por confiar en Farmacia San Martín 💚
      </p>

      <div className="comprobante-boton-wrapper">
        <button onClick={exportarPDF} className="comprobante-boton">
          Exportar comprobante como PDF
        </button>
      </div>
    </div>
  );
}
