import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import TablaEmpleados from "../components/empleados/TablaEmpleados";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalEdicionEmpleados from "../components/empleados/ModalEdicionEmpleado";
import ModalEliminacionEmpleado from "../components/empleados/ModalEliminacionEmpleado";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [EmpleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Estados para los modales
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    ID_Empleado: "",
    Nombre: "",
    Apellido: "",
    Contacto: "",
    Email: "",
    Cargo: "",
  });


  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/empleados");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los empleados");
      }
      const datos = await respuesta.json();
      setEmpleados(datos);
      setEmpleadosFiltrados(datos);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setCargando(false);
    }
  };


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = empleados.filter(
      (emp) =>
        emp.Nombre?.toLowerCase().includes(texto) ||
        emp.Apellido?.toLowerCase().includes(texto) ||
        emp.Contacto?.toLowerCase().includes(texto) ||
        emp.Email?.toLowerCase().includes(texto) ||
        emp.Cargo?.toLowerCase().includes(texto) 
    );

    setEmpleadosFiltrados(filtrados);
  };


  const abrirModalEditar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarModalEditar(true);
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado({ ...empleadoSeleccionado, [name]: value });
  };

  const guardarCambiosEmpleado = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/API/actualizarempleado/${empleadoSeleccionado.ID_Empleado}`,
        {
          method: "Put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empleadoSeleccionado),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar empleado");

      setMostrarModalEditar(false);
      obtenerEmpleados();
    } catch (error) {
      console.error(error.message);
    }
  };


  const abrirModalEliminar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacionEmpleado = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/API/eliminarempleado/${empleadoSeleccionado.ID_Empleado}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar empleado");

      setMostrarModalEliminar(false);
      obtenerEmpleados();
    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Empleado</h4>

      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <Button variant="outline-primary" onClick={generarPDFEmpleados}>
            Exportar PDF
          </Button>
        </Col>
      </Row>

      <TablaEmpleados
        empleados={EmpleadosFiltrados}
        cargando={cargando}
        abrirModalEditar={abrirModalEditar}
        abrirModalEliminar={abrirModalEliminar}
      />

      {/* Modal Edición */}
      <ModalEdicionEmpleados
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        empleadoSeleccionado={empleadoSeleccionado}
        manejarCambioInput={manejarCambioInput}
        guardarCambiosEmpleado={guardarCambiosEmpleado}
      />

      {/* Modal Eliminación */}
      <ModalEliminacionEmpleado
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        empleadoSeleccionado={empleadoSeleccionado}
        confirmarEliminacionEmpleado={confirmarEliminacionEmpleado}
      />
    </Container>
  );
};

  const generarPDFEmpleados = () => {
    const doc = new jsPDF();
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Lista de Empleados", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

    const columnas = ["ID", "Nombre", "Apellido", "Teléfono", "Email", "Cargo"];
    const filas = EmpleadosFiltrados.map((e) => [e.ID_Empleado, e.Nombre, e.Apellido, e.Contacto || e.Telefono || "", e.Email, e.Cargo]);

    const totalPaginas = "{total_pages_count_string}";

    autoTable(doc, { head: [columnas], body: filas, startY: 40, theme: "grid", styles: { fontSize: 9 } , didDrawPage: function(){
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
    const nombreArchivo = `empleados_${String(fecha.getDate()).padStart(2, "0")}${String(fecha.getMonth()+1).padStart(2,"0")}${fecha.getFullYear()}.pdf`;
    doc.save(nombreArchivo);
  };

export default Empleados;