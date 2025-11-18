import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProductos from "../components/productos/ModalRegistroProductos";
import ModalEdicionProductos from "../components/productos/ModalEdicionProductos";
import ModalEliminacionProductos from "../components/productos/ModalEliminacionProductos";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    ID_Producto: "",
    Nombre_P: "",
    Descripcion: "",
    Cantidad: 0,
    Disponible: true,
    PrecioCompra: 0,
    PrecioVenta: 0,
  });

  const [nuevoProducto, setNuevoProducto] = useState({
    Nombre_P: "",
    Descripcion: "",
    Cantidad: 0,
    Disponible: true,
    PrecioCompra: 0,
    PrecioVenta: 0,
  });

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/productos");
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProductos(data);
      setProductosFiltrados(data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter((prd) =>
      prd.Nombre_P?.toLowerCase().includes(texto) ||
      prd.Descripcion?.toLowerCase().includes(texto) ||
      prd.PrecioCompra?.toString().includes(texto) ||
      prd.PrecioVenta?.toString().includes(texto) ||
      prd.Cantidad?.toString().includes(texto)
    );

    setProductosFiltrados(filtrados);
  };

  const abrirModalAgregar = () => setMostrarModalAgregar(true);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    // Convert select boolean strings to actual booleans
    if (name === "Disponible") {
      setNuevoProducto({ ...nuevoProducto, [name]: value === "true" });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  const registrarProducto = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/registrarProducto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      if (!res.ok) throw new Error("Error al registrar producto");
      setMostrarModalAgregar(false);
      setNuevoProducto({ Nombre_P: "", Descripcion: "", Cantidad: 0, Disponible: true, PrecioCompra: 0, PrecioVenta: 0 });
      obtenerProductos();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const abrirModalEditar = (prd) => {
    setProductoSeleccionado(prd);
    setMostrarModalEditar(true);
  };

  const manejarCambioEditar = (e) => {
    const { name, value } = e.target;
    if (name === "Disponible") {
      setProductoSeleccionado({ ...productoSeleccionado, [name]: value === "true" });
    } else {
      setProductoSeleccionado({ ...productoSeleccionado, [name]: value });
    }
  };

  const guardarCambiosProducto = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/actualizarProducto/${productoSeleccionado.ID_Producto}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoSeleccionado),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar producto");
      setMostrarModalEditar(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const abrirModalEliminar = (prd) => {
    setProductoSeleccionado(prd);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacionProducto = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/eliminarProducto/${productoSeleccionado.ID_Producto}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar producto");
      setMostrarModalEliminar(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const generarPDFProductos = () => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Lista de Productos", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

    const columnas = [
      "ID",
      "Nombre",
      "Descripción",
      "Cantidad",
      "Disponible",
      "Precio compra",
      "Precio venta",
    ];

    const filas = productosFiltrados.map((producto) => [
      producto.ID_Producto,
      producto.Nombre_P,
      producto.Descripcion || "",
      producto.Cantidad ?? "",
      producto.Disponible === true ? "Sí" : producto.Disponible === false ? "No" : "",
      producto.PrecioCompra != null ? `$${producto.PrecioCompra}` : "",
      producto.PrecioVenta != null ? `$${producto.PrecioVenta}` : "",
    ]);

    const totalPaginas = "{total_pages_count_string}";

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2 },
      margin: { top: 14, left: 10, right: 10 },
      tableWidth: "auto",
      didDrawPage: function (data) {
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();
        const numeroPagina = doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const piePagina = "Página " + numeroPagina + " de " + totalPaginas;
        doc.text(piePagina, anchoPagina / 2, alturaPagina - 10, { align: "center" });
      },
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPaginas);
    }

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const nombreArchivo = `productos_${dia}${mes}${anio}.pdf`;

    doc.save(nombreArchivo);
  };

  return (
    <Container className="mt-4">
      <h4>Productos</h4>

      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <Button variant="outline-primary" onClick={generarPDFProductos}>
            Exportar PDF
          </Button>
        </Col>
      </Row>

      <TablaProductos
        productos={productosFiltrados}
        cargando={cargando}
        abrirModalAgregar={abrirModalAgregar}
        abrirModalEditar={abrirModalEditar}
        abrirModalEliminar={abrirModalEliminar}
      />

      <ModalRegistroProductos
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        registrarProducto={registrarProducto}
      />

      <ModalEdicionProductos
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        productoSeleccionado={productoSeleccionado}
        manejarCambioInput={manejarCambioEditar}
        guardarCambiosProducto={guardarCambiosProducto}
      />

      <ModalEliminacionProductos
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        productoSeleccionado={productoSeleccionado}
        confirmarEliminacionProducto={confirmarEliminacionProducto}
      />
    </Container>
  );
};

export default Productos;
