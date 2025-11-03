import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCategoria from "../components/clientes/ModalRegistroClientes";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [clientesFiltrados, setclientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
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
    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  const agregarCliente = async () => {
    if (!nuevoCliente.Nombre1.trim()) return;
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarCliente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoCliente),
        }
      );

      if (!respuesta.ok) throw new Error("Error al guardar");

      // Limpiar y cerrar
      setNuevoCliente({
        Nombre1: "",
        Nombre2: "",
        Apellidos1: "",
        Apellidos2: "",
        Cedula: "",
        Telefono: "",
      });
      setMostrarModal(false);
      await obtenerClientes(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar un cliente:", error);
      alert("No se pudo guardar el cliente. Revisa la consola.");
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/clientes");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los clientes");
      }
      const datos = await respuesta.json();
      setClientes(datos);
      setclientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = clientes.filter(
      (cliente) =>
        cliente.Nombre1.toLowerCase().includes(texto) ||
        cliente.Nombre2.toLowerCase().includes(texto) ||
        cliente.Apellidos1.toLowerCase().includes(texto) ||
        cliente.Apellidos2.toLowerCase().includes(texto) ||
        cliente.Cedula.toLowerCase().includes(texto) ||
        cliente.Telefono.toLowerCase().includes(texto)
    );
    setclientesFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Clientes</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setMostrarModal(true)}>
              + Nuevo Cliente
            </Button>
          </Col>
        </Row>

        <TablaClientes clientes={clientesFiltrados} cargando={cargando} />
        <ModalRegistroCategoria
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCategoria={nuevoCliente}
          manejarCambioInput={manejarCambioInput}
          agregarCategoria={agregarCliente}
        />
      </Container>
    </>
  );
};

export default Clientes;
