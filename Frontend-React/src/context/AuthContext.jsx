import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/auth";

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); 

  // Carga el usuario desde localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
      window.dispatchEvent(new Event("carritoActualizado"));
    }
  }, []);

  // Registro de usuario
  const register = async (id, username, email, password) => {
    const res = await registerUser(id, username, email.trim().toLowerCase(), password);
    if (res.success && res.data?.usuario) {
      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      window.dispatchEvent(new Event("carritoActualizado"));
    } else {
      console.error("Error en registro:", res.error);
    }
    return res;
  };

  // Inicio de sesión
  const login = async (email, password) => {
    const res = await loginUser(email.trim().toLowerCase(), password);
    if (res.success && res.data?.usuario) {
      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      window.dispatchEvent(new Event("carritoActualizado"));
    } else {
      console.error("Error en login:", res.error);
    }
    return res;
  };

  // Cierre de sesión
  const logout = () => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioActual) {
      localStorage.removeItem(`cart_usuario_${usuarioActual.id}`);
    }
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  // Provee el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ usuario, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


//Estado global entre componentes