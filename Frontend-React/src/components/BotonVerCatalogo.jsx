import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style_navbar.css';

export default function BotonVerCatalogo() {
  return (
    <div className="boton-volver text-center mt-4 mb-5">
      <Link to="/productos" className="btn-volver" style={{marginTop:'20px'}}>
        Ver el catálogo
      </Link>
    </div>
  );
}
