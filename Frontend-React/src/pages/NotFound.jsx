import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#61c286',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#2e7d32'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Página no encontrada</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>
          Lo sentimos, la página que ha solicitado no existe.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#2e7d32',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2e7d32'}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

