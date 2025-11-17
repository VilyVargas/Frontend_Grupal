import { useState } from "react";
import Login from "../views/Login";

const RutaProtegida = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);

  if (!autenticado) {
    // Muestra el login antes de mostrar la entidad
    return <Login onLoginExitoso={() => setAutenticado(true)} />;
  }

  // Una vez logueado, muestra la entidad
  return children;
};

export default RutaProtegida;
