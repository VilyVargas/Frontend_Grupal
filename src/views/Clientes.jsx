import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroClientes from "../components/clientes/ModalRegistroClientes";
import ModalEdicionCliente from "../components/clientes/ModalEdicionCliente";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionCliente";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre1: "",
    Nombre2: "",
    Apellidos1: "",
    Apellidos2: "",
    Cedula: "",
    Telefono: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ ...prev, [name]: value } ));
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/clientes");
      if (!respuesta.ok) throw new Error("Error al obtener clientes");
      const datos = await respuesta.json();
      setClientes(datos);
      setClientesFiltrados(datos);
    } catch (error) {
      console.error(error.message);
    }
  };

const agregarCliente = async () => {
  if (!nuevoCliente.Nombre1.trim() || !nuevoCliente.Apellidos1.trim()) return;
  try {
    const respuesta = await fetch("http://localhost:3000/api/registrarCliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoCliente),
    });
    if (!respuesta.ok) throw new Error("Error al guardar cliente");
    setNuevoCliente({
      Nombre1: "",
      Nombre2: "",
      Apellidos1: "",
      Apellidos2: "",
      Cedula: "",
      Telefono: "",
    });
    setMostrarModal(false);
    await obtenerClientes();
  } catch (error) {
    console.error("Error al agregar cliente:", error);
    alert("No se pudo guardar el cliente.");
  }
};

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = clientes.filter(
      (cli) =>
        `${cli.Nombre1} ${cli.Nombre2} ${cli.Apellidos1} ${cli.Apellidos2}`
          .toLowerCase()
          .includes(texto) ||
        cli.Cedula?.toLowerCase().includes(texto) ||
        cli.Telefono?.includes(texto)
    );
    setClientesFiltrados(filtrados);
  };

  const abrirModalEdicion = (cliente) => {
    setClienteEditado({ ...cliente });
    setMostrarModalEdicion(true);
  };

const guardarEdicion = async () => {
  try {
    const respuesta = await fetch(
      `http://localhost:3000/api/actualizarCliente/${clienteEditado.ID_Cliente}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteEditado),
      }
    );
    if (!respuesta.ok) throw new Error("Error al actualizar");
    setMostrarModalEdicion(false);
    await obtenerClientes();
  } catch (error) {
    console.error("Error al editar cliente:", error);
    alert("No se pudo actualizar el cliente.");
  }
};

  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminar(true);
  };

const confirmarEliminacion = async () => {
  try {
    const respuesta = await fetch(
      `http://localhost:3000/api/eliminarCliente/${clienteAEliminar.ID_Cliente}`,
      { method: "DELETE" }
    );
    if (!respuesta.ok) throw new Error("Error al eliminar");
    setMostrarModalEliminar(false);
    await obtenerClientes();
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    alert("No se pudo eliminar el cliente.");
  }
};

  useEffect(() => {
    obtenerClientes();
  }, []);

  const clientesPaginados = clientesFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <Container className="mt-4">
      <h4>Clientes</h4>
      <Row>
        <Col lg={5} md={6} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
            + Nuevo Cliente
          </Button>
        </Col>
      </Row>

      <TablaClientes
        clientes={clientesPaginados}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={clientes.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroClientes
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
      />

      <ModalEdicionCliente
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        clienteEditado={clienteEditado}
        setClienteEditado={setClienteEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionCliente
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        cliente={clienteAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Clientes;
