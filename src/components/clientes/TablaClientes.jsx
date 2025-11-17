import { useState, useEffect } from "react";
import { Table, Button, Pagination, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroClientes from "./ModalRegistroClientes";

const TablaClientes = ({ clientes = [], cargando }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre1: "",
    Nombre2: "",
    Apellidos1: "",
    Apellidos2: "",
    Cedula: "",
    Telefono: "",
  });
  const [listaClientes, setListaClientes] = useState([]);

  // 🔹 Cargar clientes iniciales
  useEffect(() => {
    setListaClientes(clientes);
  }, [clientes]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaClientes.length / elementosPorPagina);

  // 🔹 Clientes visibles según la página
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const clientesVisibles = listaClientes.slice(inicio, fin);

  // 🔹 Cambio de página
  const cambiarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaActual(numero);
    }
  };

  // 🔹 Manejo de inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Agregar cliente
  const agregarCliente = () => {
    if (!nuevoCliente.Nombre1.trim() || !nuevoCliente.Apellidos1.trim()) {
      Swal.fire(
        "Campos requeridos",
        "Debe ingresar al menos el primer nombre y apellido",
        "warning"
      );
      return;
    }

    const nuevo = {
      ID_Cliente: listaClientes.length + 1,
      ...nuevoCliente,
    };

    setListaClientes([...listaClientes, nuevo]);
    setMostrarModal(false);
    setNuevoCliente({
      Nombre1: "",
      Nombre2: "",
      Apellidos1: "",
      Apellidos2: "",
      Cedula: "",
      Telefono: "",
    });
    setPaginaActual(Math.ceil((listaClientes.length + 1) / elementosPorPagina));

    Swal.fire("Éxito", "Cliente agregado correctamente", "success");
  };

  // 🔹 Editar cliente
  const editarCliente = (cliente) => {
    setModoEdicion(true);
    setClienteEditando(cliente);
    setNuevoCliente({
      Nombre1: cliente.Nombre1,
      Nombre2: cliente.Nombre2,
      Apellidos1: cliente.Apellidos1,
      Apellidos2: cliente.Apellidos2,
      Cedula: cliente.Cedula,
      Telefono: cliente.Telefono,
    });
    setMostrarModal(true);
  };

  // 🔹 Guardar edición
  const guardarEdicion = () => {
    setListaClientes(
      listaClientes.map((c) =>
        c.ID_Cliente === clienteEditando.ID_Cliente
          ? { ...c, ...nuevoCliente }
          : c
      )
    );
    setMostrarModal(false);
    setModoEdicion(false);
    setClienteEditando(null);
    setNuevoCliente({
      Nombre1: "",
      Nombre2: "",
      Apellidos1: "",
      Apellidos2: "",
      Cedula: "",
      Telefono: "",
    });
    Swal.fire("Actualizado", "Cliente editado correctamente", "success");
  };

  // 🔹 Eliminar cliente
  const eliminarCliente = (id) => {
    Swal.fire({
      title: "¿Eliminar cliente?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setListaClientes(listaClientes.filter((c) => c.ID_Cliente !== id));
        Swal.fire("Eliminado", "El cliente fue eliminado correctamente", "success");
      }
    });
  };

  // 🔹 Spinner de carga
  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando clientes...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Lista de Clientes</h5>
        <Button
          variant="success"
          onClick={() => {
            setModoEdicion(false);
            setMostrarModal(true);
          }}
        >
          ➕ Agregar Cliente
        </Button>
      </div>

      {/* Tabla */}
      <Table striped bordered hover size="sm" responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesVisibles.length > 0 ? (
            clientesVisibles.map((cli) => (
              <tr key={cli.ID_Cliente}>
                <td>{cli.ID_Cliente}</td>
                <td>{cli.Nombre1}</td>
                <td>{cli.Nombre2}</td>
                <td>{cli.Apellidos1}</td>
                <td>{cli.Apellidos2}</td>
                <td>{cli.Cedula}</td>
                <td>{cli.Telefono}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editarCliente(cli)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarCliente(cli.ID_Cliente)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay clientes registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.First
            onClick={() => cambiarPagina(1)}
            disabled={paginaActual === 1}
          />
          <Pagination.Prev
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          />
          {[...Array(totalPaginas)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={paginaActual === i + 1}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          />
          <Pagination.Last
            onClick={() => cambiarPagina(totalPaginas)}
            disabled={paginaActual === totalPaginas}
          />
        </Pagination>
      )}

      {/* Modal para agregar o editar */}
      <ModalRegistroClientes
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={modoEdicion ? guardarEdicion : agregarCliente}
        modoEdicion={modoEdicion}
      />
    </div>
  );
};

export default TablaClientes;
