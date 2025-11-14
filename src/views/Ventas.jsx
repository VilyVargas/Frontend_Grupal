import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TablaVentas from "../components/ventas/TablaVentas";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroVentas from "../components/ventas/ModalRegistroVentas";
import ModalEdicionVentas from "../components/ventas/ModalEdicionVentas";
import ModalEliminacionVentas from "../components/ventas/ModalEliminacionVentas";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Estados para los modales
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [ventaSeleccionada, setVentaSeleccionada] = useState({
    ID_Venta: "",
    Fecha: "",
    ID_Cliente: "",
    ID_Empleado: "",
    Total: "",
  });

  const [nuevaVenta, setNuevaVenta] = useState({
    Fecha: "",
    ID_Cliente: "",
    ID_Empleado: "",
    Total: "",
  });

  // 📥 Obtener ventas desde API
  const obtenerVentas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/ventas");
      if (!respuesta.ok) throw new Error("Error al obtener las ventas");

      const datos = await respuesta.json();
      setVentas(datos);
      setVentasFiltradas(datos);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  // 🔎 Filtrado por búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = ventas.filter(
      (vta) =>
        vta.Fecha?.toLowerCase().includes(texto) ||
        vta.ID_Cliente?.toString().includes(texto) ||
        vta.ID_Empleado?.toString().includes(texto) ||
        vta.Total?.toString().includes(texto)
    );

    setVentasFiltradas(filtradas);
  };

  // 🟢 Abrir modal registro
  const abrirModalAgregar = () => setMostrarModalAgregar(true);

  // 🟩 Manejo inputs del modal registro
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaVenta({ ...nuevaVenta, [name]: value });
  };

  const registrarVenta = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarVenta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVenta),
      });

      if (!respuesta.ok) throw new Error("Error al registrar venta");

      setMostrarModalAgregar(false);
      setNuevaVenta({ Fecha: "", ID_Cliente: "", ID_Empleado: "", Total: "" });
      obtenerVentas();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // ✏️ Editar venta
  const abrirModalEditar = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModalEditar(true);
  };

  const manejarCambioEditar = (e) => {
    const { name, value } = e.target;
    setVentaSeleccionada({ ...ventaSeleccionada, [name]: value });
  };

  const guardarCambiosVenta = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarVenta/${ventaSeleccionada.ID_Venta}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ventaSeleccionada),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar venta");

      setMostrarModalEditar(false);
      obtenerVentas();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // 🗑️ Eliminar venta
  const abrirModalEliminar = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacionVenta = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarVenta/${ventaSeleccionada.ID_Venta}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar venta");

      setMostrarModalEliminar(false);
      obtenerVentas();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h4>Ventas</h4>

      {/* 🔍 Cuadro de búsqueda */}
      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      {/* 📋 Tabla */}
      <TablaVentas
        ventas={ventasFiltradas}
        cargando={cargando}
        abrirModalEditar={abrirModalEditar}
        abrirModalEliminar={abrirModalEliminar}
        abrirModalAgregar={abrirModalAgregar}
      />

      {/* 🟩 Modal Registrar */}
      <ModalRegistroVentas
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevaVenta={nuevaVenta}
        manejarCambioInput={manejarCambioInput}
        registrarVenta={registrarVenta}
      />

      {/* ✏️ Modal Editar */}
      <ModalEdicionVentas
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        ventaSeleccionada={ventaSeleccionada}
        manejarCambioInput={manejarCambioEditar}
        guardarCambiosVenta={guardarCambiosVenta}
      />

      {/* 🗑️ Modal Eliminar */}
      <ModalEliminacionVentas
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        ventaSeleccionada={ventaSeleccionada}
        confirmarEliminacionVenta={confirmarEliminacionVenta}
      />
    </Container>
  );
};

export default Ventas;
