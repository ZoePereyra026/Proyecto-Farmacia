import React from 'react';
import { useAuth } from '../hooks/useAuth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

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
    <div
      id="comprobante"
      style={{
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        maxWidth: '600px',
        margin: '2rem auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        color: '#333'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Comprobante de Compra</h2>

      <div style={{ marginBottom: '1rem' }}>
        <p><strong>ID de usuario:</strong> {usuario?.id}</p>
        <p><strong>Nombre:</strong> {usuario?.username || usuario?.nombre || usuario?.email}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>N° de ticket:</strong> #{nroTicket}</p>
      </div>

      <hr style={{ margin: '1rem 0' }} />

      <h4 style={{ marginBottom: '0.5rem' }}>Productos comprados:</h4>
      <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
        {carrito.map((item, i) => (
          <li key={i}>
            {item.nombre} — Cantidad: {item.qty} — Precio unitario: ${item.precio}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Total: ${total}</p>

      <p style={{
        marginTop: '2rem',
        fontSize: '1.2rem',
        textAlign: 'center',
        color: '#2e7d32'
      }}>
        Gracias por confiar en Farmacia San Martín 💚
      </p>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={exportarPDF}
          style={{
            backgroundColor: '#00B77A',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Exportar comprobante como PDF
        </button>
      </div>
    </div>
  );
}
