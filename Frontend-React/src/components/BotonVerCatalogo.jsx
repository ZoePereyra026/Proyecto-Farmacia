import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style_navbar.css';

export default function BotonVerCatalogo() {
  return (
    <div className="boton-volver text-center">
      <Link to="/productos" className="btn-volver" style={{marginTop: '0px'}}>
        Ver el catálogo
      </Link>
    </div>
  );
}
