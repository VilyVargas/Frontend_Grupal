import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
        <Col className="d-flex align-items-center">
          <Button variant="outline-primary" onClick={generarPDFCompras}>
            Exportar PDF
          </Button>
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

  const generarPDFCompras = () => {
    const doc = new jsPDF();
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Lista de Compras", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

    const columnas = ["ID", "Fecha", "Proveedor", "ID Empleado", "Total Compra"];
    const filas = comprasFiltradas.map((c) => [c.ID_Compra, c.Fecha_compra || c.Fecha, c.ID_Proveedor || c.Proveedor, c.ID_Empleado || "", c.Total_Compra || c.Total]);

    const totalPaginas = "{total_pages_count_string}";

    autoTable(doc, { head: [columnas], body: filas, startY: 40, theme: "grid", styles: { fontSize: 9 }, didDrawPage: function(){
      const alturaPagina = doc.internal.pageSize.getHeight();
      const anchoPagina = doc.internal.pageSize.getWidth();
      const numeroPagina = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(0,0,0);
      const piePagina = "Página " + numeroPagina + " de " + totalPaginas;
      doc.text(piePagina, anchoPagina/2, alturaPagina - 10, { align: "center" });
    }});

    if (typeof doc.putTotalPages === "function") doc.putTotalPages(totalPaginas);
    const fecha = new Date();
    const nombreArchivo = `compras_${String(fecha.getDate()).padStart(2, "0")}${String(fecha.getMonth()+1).padStart(2,"0")}${fecha.getFullYear()}.pdf`;
    doc.save(nombreArchivo);
  };

export default Compras;
