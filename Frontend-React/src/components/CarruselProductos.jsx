import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import TarjetaCarrucel from './TarjetaCarrucel';

export default function CarrucelProductos() {
  const productos = useProductos() || [];
  const [inicio, setInicio] = useState(0);
  const cantidadVisible = 3;
  const total = productos.length;

  // Evitar render si no hay productos
  if (total === 0) {
    return <div className="text-center py-5">Cargando productos...</div>;
  }

  const mostrarSiguiente = () => {
    setInicio((inicio + 1) % total);
  };

  const mostrarAnterior = () => {
    setInicio((inicio - 1 + total) % total);
  };

  // Generar productos visibles con envoltura circular
  const productosVisibles = [];
  for (let i = 0; i < cantidadVisible; i++) {
    const index = (inicio + i) % total;
    productosVisibles.push(productos[index]);
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Productos de la Farmacia</h2>

        <div
          className="d-flex align-items-center justify-content-center mx-auto"
          style={{ maxWidth: '1080px' }}
        >
          <button
            className="btn btn-outline-primary me-3"
            onClick={mostrarAnterior}
            style={{ height: '100%' }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="d-flex justify-content-center gap-4">
            {productosVisibles.map((producto) => (
              <TarjetaCarrucel key={producto.id} producto={producto} />
            ))}
          </div>

          <button
            className="btn btn-outline-primary ms-3"
            onClick={mostrarSiguiente}
            style={{ height: '100%' }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="boton-volver text-center mt-4 mb-3">
          <Link to="/productos" className="btn-volver">
            Ver el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
