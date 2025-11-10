import { createContext, useState } from "react";
import { registerUser, loginUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const register = async (id, username, email, password) => {
    const res = await registerUser(id, username, email, password);
    if (res.success) setUsuario(res.data.usuario);
    return res;
  };

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.success) setUsuario(res.data.usuario);
    return res;
    };
    
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
