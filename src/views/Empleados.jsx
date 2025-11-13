import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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

export default Empleados;