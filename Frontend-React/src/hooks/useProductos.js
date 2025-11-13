import { useState, useEffect } from 'react';

export default function useProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://proyecto-farmacia-backend-jsio.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al cargar productos:", error));
  }, []);

  return productos;
}
