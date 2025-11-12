import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaProveedores from "../components/proveedores/TablaProveedores";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalEdicionProveedores from "../components/proveedores/ModalEdicionProveedores";
import ModalEliminacionProveedores from "../components/proveedores/ModalEliminacionProveedores";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Estados para los modales
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState({
    ID_Proveedor: "",
    Nombre_Prov: "",
    Contacto: "",
    Email: "",
  });


  const obtenerProveedores = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/proveedores");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los proveedores");
      }
      const datos = await respuesta.json();
      setProveedores(datos);
      setProveedoresFiltrados(datos);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setCargando(false);
    }
  };


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = proveedores.filter(
      (prov) =>
        prov.Nombre_Prov?.toLowerCase().includes(texto) ||
        prov.Contacto?.toLowerCase().includes(texto) ||
        prov.Email?.toLowerCase().includes(texto)
    );

    setProveedoresFiltrados(filtrados);
  };


  const abrirModalEditar = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setMostrarModalEditar(true);
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setProveedorSeleccionado({ ...proveedorSeleccionado, [name]: value });
  };

  const guardarCambiosProveedor = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/API/actualizarproveedores/${proveedorSeleccionado.ID_Proveedor}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proveedorSeleccionado),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar proveedor");

      setMostrarModalEditar(false);
      obtenerProveedores();
    } catch (error) {
      console.error(error.message);
    }
  };


  const abrirModalEliminar = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacionProveedor = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/API/eliminarproveedores/${proveedorSeleccionado.ID_Proveedor}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar proveedor");

      setMostrarModalEliminar(false);
      obtenerProveedores();
    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    obtenerProveedores();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Proveedores</h4>

      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <TablaProveedores
        proveedores={proveedoresFiltrados}
        cargando={cargando}
        abrirModalEditar={abrirModalEditar}
        abrirModalEliminar={abrirModalEliminar}
      />

      {/* Modal Edición */}
      <ModalEdicionProveedores
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        proveedorSeleccionado={proveedorSeleccionado}
        manejarCambioInput={manejarCambioInput}
        guardarCambiosProveedor={guardarCambiosProveedor}
      />

      {/* Modal Eliminación */}
      <ModalEliminacionProveedores
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        proveedorSeleccionado={proveedorSeleccionado}
        confirmarEliminacionProveedor={confirmarEliminacionProveedor}
      />
    </Container>
  );
};

export default Proveedores;
