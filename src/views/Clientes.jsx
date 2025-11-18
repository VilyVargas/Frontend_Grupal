import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
        <Col className="d-flex align-items-center">
          <Button variant="outline-primary" onClick={generarPDFClientes}>
            Exportar PDF
          </Button>
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

  const generarPDFClientes = () => {
    const doc = new jsPDF();

    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Lista de Clientes", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

    const columnas = ["ID", "Nombre1", "Nombre2", "Apellido1", "Apellido2", "Cédula", "Teléfono"];
    const filas = clientesFiltrados.map((c) => [
      c.ID_Cliente,
      c.Nombre1,
      c.Nombre2,
      c.Apellidos1,
      c.Apellidos2,
      c.Cedula,
      c.Telefono,
    ]);

    const totalPaginas = "{total_pages_count_string}";

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2 },
      margin: { top: 14, left: 10, right: 10 },
      didDrawPage: function () {
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();
        const numeroPagina = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const piePagina = "Página " + numeroPagina + " de " + totalPaginas;
        doc.text(piePagina, anchoPagina / 2, alturaPagina - 10, { align: "center" });
      },
    });

    if (typeof doc.putTotalPages === "function") doc.putTotalPages(totalPaginas);

    const fecha = new Date();
    const nombreArchivo = `clientes_${String(fecha.getDate()).padStart(2, "0")}${String(fecha.getMonth()+1).padStart(2,"0")}${fecha.getFullYear()}.pdf`;
    doc.save(nombreArchivo);
  };

export default Clientes;