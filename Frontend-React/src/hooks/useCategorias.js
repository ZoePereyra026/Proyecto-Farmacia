import { useState, useEffect } from 'react';

export default function useCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('https://proyecto-farmacia-backend-jsio.onrender.com/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(error => console.error("Error al cargar categorías:", error));
  }, []);

  return categorias;
}
