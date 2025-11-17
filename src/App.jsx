import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

//Importar componente Encabezado.
import Encabezado from "./components/navegacion/Encabezado";

//Importar las vistas.
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Productos from "./views/Productos";
import Proveedores from "./views/Proveedores";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Clientes from "./views/Clientes";
import Catalogo from "./views/Catalogo";
import Empleados from "./views/Empleados";

import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const esLogin = location.pathname === "/login";

  return (
    <>
      {/* Ocultar encabezado en login */}
      {!esLogin && <Encabezado />}

      <main className={!esLogin ? "margen-superior-main" : ""}>
        <Routes>
          {/* Redirigir raíz → login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Página principal del login */}
          <Route path="/login" element={<Login tipo="principal" />} />

          {/* Inicio, solo después del login */}
          <Route path="/inicio" element={<Inicio />} />

          {/* ENTIDADES: piden login antes de mostrarse */}
          <Route
            path="/productos"
            element={<Login tipo="entidad" entidad={<Productos />} />}
          />
          <Route
            path="/proveedores"
            element={<Login tipo="entidad" entidad={<Proveedores />} />}
          />
          <Route
            path="/ventas"
            element={<Login tipo="entidad" entidad={<Ventas />} />}
          />
          <Route
            path="/compras"
            element={<Login tipo="entidad" entidad={<Compras />} />}
          />
          <Route
            path="/clientes"
            element={<Login tipo="entidad" entidad={<Clientes />} />}
          />
          <Route
            path="/catalogo"
            element={<Login tipo="entidad" entidad={<Catalogo />} />}
          />
          <Route
            path="/empleados"
            element={<Login tipo="entidad" entidad={<Empleados />} />}
          />

          {/* Error 404 */}
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
