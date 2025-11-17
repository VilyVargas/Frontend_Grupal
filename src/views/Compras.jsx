import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TablaCompras from "../components/compras/Tablacompras";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalEdicionCompras from "../components/compras/ModalEdicionCompras";
import ModalEliminacionCompras from "../components/compras/ModalEliminacionCompras";
import ModalRegistroCompras from "../components/compras/ModalRegistroCompras";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Estados para los modales
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [compraSeleccionada, setCompraSeleccionada] = useState({
    ID_Compra: "",
    Fecha: "",
    Proveedor: "",
    Total: "",
  });

  const [nuevaCompra, setNuevaCompra] = useState({
    Fecha: "",
    Proveedor: "",
    Total: "",
  });

  // 📥 Obtener compras
  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/compras");
      if (!respuesta.ok) {
        throw new Error("Error al obtener las compras");
      }
      const datos = await respuesta.json();
      setCompras(datos);
      setComprasFiltradas(datos);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCompras();
  }, []);

  // 🔎 Buscar compra
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = compras.filter(
      (c) =>
        c.Fecha?.toLowerCase().includes(texto) ||
        c.Proveedor?.toLowerCase().includes(texto) ||
        c.Total?.toString().includes(texto)
    );

    setComprasFiltradas(filtradas);
  };

  // 🟢 Abrir modal de registro
  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  // 🟩 Guardar nueva compra
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCompra({ ...nuevaCompra, [name]: value });
  };

  const agregarCompra = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarCompra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCompra),
      });

      if (!respuesta.ok) throw new Error("Error al registrar compra");

      setMostrarModalAgregar(false);
      setNuevaCompra({
        Fecha: "",
        Proveedor: "",
        Total: "",
      });
      obtenerCompras();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // ✏️ Editar compra
  const abrirModalEditar = (compra) => {
    setCompraSeleccionada(compra);
    setMostrarModalEditar(true);
  };

  const manejarCambioEditar = (e) => {
    const { name, value } = e.target;
    setCompraSeleccionada({ ...compraSeleccionada, [name]: value });
  };

  const guardarCambiosCompra = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarCompra/${compraSeleccionada.ID_Compra}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(compraSeleccionada),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar compra");

      setMostrarModalEditar(false);
      obtenerCompras();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // 🗑️ Eliminar compra
  const abrirModalEliminar = (compra) => {
    setCompraSeleccionada(compra);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacionCompra = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarCompra/${compraSeleccionada.ID_Compra}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar compra");

      setMostrarModalEliminar(false);
      obtenerCompras();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h4>Compras</h4>

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
      <TablaCompras
        compras={comprasFiltradas}
        cargando={cargando}
        abrirModalEditar={abrirModalEditar}
        abrirModalEliminar={abrirModalEliminar}
        abrirModalAgregar={abrirModalAgregar}
      />

      {/* 🟩 Modal Registrar */}
      <ModalRegistroCompras
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevaCompra={nuevaCompra}
        manejarCambioInput={manejarCambioInput}
        agregarCompra={agregarCompra}
      />

      {/* ✏️ Modal Editar */}
      <ModalEdicionCompras
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        compraSeleccionada={compraSeleccionada}
        manejarCambioInput={manejarCambioEditar}
        guardarCambiosCompra={guardarCambiosCompra}
      />

      {/* 🗑️ Modal Eliminar */}
      <ModalEliminacionCompras
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        compraSeleccionada={compraSeleccionada}
        confirmarEliminacionCompra={confirmarEliminacionCompra}
      />
    </Container>
  );
};

export default Compras;
