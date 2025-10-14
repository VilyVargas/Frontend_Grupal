

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Catalago from "./views/Catalogo";

//Importar archivo de estilos.
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/catalogo" element={<Catalago />} />
          <Route path="*" element={<h2>404 - Pagina no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;