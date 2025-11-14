import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalEdicionCliente from "../components/clientes/ModalEdicionClientes";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionClientes";
import ModalRegistroClientes from "../components/clientes/ModalRegistroClientes";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Estados para los modales
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    ID_Cliente: "",
    Nombre1: "",
    Nombre2: "",
    Apellidos1: "",
    Apellidos2: "",
    Cedula: "",
    Telefono: "",
  });

  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre1: "",
    Nombre2: "",
    Apellidos1: "",
    Apellidos2: "",
    Cedula: "",
    Telefono: "",
  });

  // 📥 Obtener clientes
  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/clientes");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los clientes");
      }
      const datos = await respuesta.json();
      setClientes(datos);
      setClientesFiltrados(datos);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // 🔎 Buscar cliente
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = clientes.filter(
      (cli) =>
        cli.Nombre1?.toLowerCase().includes(texto) ||
        cli.Nombre2?.toLowerCase().includes(texto) ||
        cli.Apellidos1?.toLowerCase().includes(texto) ||
        cli.Apellidos2?.toLowerCase().includes(texto) ||
        cli.Cedula?.toLowerCase().includes(texto) ||
        cli.Telefono?.includes(texto)
    );

    setClientesFiltrados(filtrados);
  };

  // 🟢 Abrir modal de registro
  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  // 🟩 Guardar nuevo cliente
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };

  const agregarCliente = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarCliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) throw new Error("Error al registrar cliente");

      setMostrarModalAgregar(false);
      setNuevoCliente({
        Nombre1: "",
        Nombre2: "",
        Apellidos1: "",
        Apellidos2: "",
        Cedula: "",
        Telefono: "",
      });
      obtenerClientes();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // ✏️ Editar cliente
  const abrirModalEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModalEditar(true);
  };

  const manejarCambioEditar = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado({ ...clienteSeleccionado, [name]: value });
  };

  const guardarCambiosCliente = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarCliente/${clienteSeleccionado.ID_Cliente}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clienteSeleccionado),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar cliente");

      setMostrarModalEditar(false);
      obtenerClientes();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // 🗑️ Eliminar cliente
  const abrirModalEliminar = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacionCliente = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarCliente/${clienteSeleccionado.ID_Cliente}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar cliente");

      setMostrarModalEliminar(false);
      obtenerClientes();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h4>Clientes</h4>

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
      <TablaClientes
        clientes={clientesFiltrados}
        cargando={cargando}
        abrirModalEditar={abrirModalEditar}
        abrirModalEliminar={abrirModalEliminar}
        abrirModalAgregar={abrirModalAgregar}
      />

      {/* 🟩 Modal Registrar */}
      <ModalRegistroClientes
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
      />

      {/* ✏️ Modal Editar */}
      <ModalEdicionCliente
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        clienteSeleccionado={clienteSeleccionado}
        manejarCambioInput={manejarCambioEditar}
        guardarCambiosCliente={guardarCambiosCliente}
      />

      {/* 🗑️ Modal Eliminar */}
      <ModalEliminacionCliente
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        clienteSeleccionado={clienteSeleccionado}
        confirmarEliminacionCliente={confirmarEliminacionCliente}
      />
    </Container>
  );
};

export default Clientes;