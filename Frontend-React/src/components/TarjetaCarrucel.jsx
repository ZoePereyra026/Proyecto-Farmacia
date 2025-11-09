import React from 'react';
import { Link } from 'react-router-dom';

export default function TarjetaCarrucel({ producto }) {
  return (
    <Link
      to={`/producto/${producto.id}`}
      className="text-decoration-none text-dark"
    >
      <div
        className="card h-100"
        style={{
          width: '280px',
          height: '380px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px'
        }}
      >
        <img
          src={producto.imagenUrl}
          className="card-img-top mx-auto d-block"
          alt={producto.nombre}
          style={{ height: '180px', objectFit: 'contain' }}
        />

        <div className="card-body text-center px-2">
          <h5
            className="card-title"
            style={{
              fontSize: '1rem',
              lineHeight: '1.2',
              minHeight: '2.4em', // reserva espacio para 2 líneas
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {producto.nombre}
          </h5>
          <p className="card-text text-success fw-bold mb-0">
            ${producto.precio}
          </p>
        </div>
      </div>
    </Link>
  );
}
