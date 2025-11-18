import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroEmpleado from "./ModalRegistroEmpleado";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaEmpleados = ({ empleados = [], cargando }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: "",
    Apellido: "",
    Contacto: "",
    Email: "",
    Cargo: "",
  });
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [orden, setOrden] = useState({ campo: null, direccion: "asc" });

  // 🔹 Cargar empleados iniciales
  useEffect(() => {
    setListaEmpleados(empleados);
  }, [empleados]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaEmpleados.length / elementosPorPagina);

  // 🔹 Cálculo de empleados visibles
  const ordenarLista = (lista) => {
    if (!orden.campo) return lista;
    return [...lista].sort((a, b) => {
      const va = a[orden.campo];
      const vb = b[orden.campo];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (!isNaN(Number(va)) && !isNaN(Number(vb))) {
        return (Number(va) - Number(vb)) * (orden.direccion === "asc" ? 1 : -1);
      }
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return orden.direccion === "asc" ? -1 : 1;
      if (sa > sb) return orden.direccion === "asc" ? 1 : -1;
      return 0;
    });
  };

  const listaOrdenada = ordenarLista(listaEmpleados);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const empleadosVisibles = listaOrdenada.slice(inicio, fin);

  const manejarOrden = (campo) => {
    setPaginaActual(1);
    setOrden((prev) => (prev.campo === campo ? { ...prev, direccion: prev.direccion === "asc" ? "desc" : "asc" } : { campo, direccion: "asc" }));
  };

  // 🔹 Cambio de página
  const cambiarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaActual(numero);
    }
  };

  // 🔹 Manejo de inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Agregar empleado
  const agregarEmpleado = () => {
    if (!nuevoEmpleado.Nombre.trim()) {
      Swal.fire("Campo requerido", "Debes ingresar un nombre de empleado", "warning");
      return;
    }

    const nuevo = {
      ID_Empleado: listaEmpleados.length + 1,
      ...nuevoEmpleado,
    };

    setListaEmpleados([...listaEmpleados, nuevo]);
    setMostrarModal(false);
    setNuevoEmpleado({ Nombre: "", Apellido: "", Telefono: "", Email: "", Cargo: "" });
    setPaginaActual(Math.ceil((listaEmpleados.length + 1) / elementosPorPagina));

    Swal.fire("Éxito", "Empleado agregado correctamente", "success");
  };

  // 🔹 Editar empleado
  const editarEmpleado = (empleado) => {
    setModoEdicion(true);
    setEmpleadoEditando(empleado);
    setNuevoEmpleado({
      Nombre: empleado.Nombre,
      Apellido: empleado.Apellido,
      Telefono: empleado.Telefono,
      Email: empleado.Email,
      Cargo: empleado.Cargo,
    });
    setMostrarModal(true);
  };

  // 🔹 Guardar cambios del empleado editado
  const guardarEdicion = () => {
    setListaEmpleados(
      listaEmpleados.map((p) =>
        p.ID_Empleado === empleadoEditando.ID_Empleado
          ? { ...p, ...nuevoEmpleado }
          : p
      )
    );
    setMostrarModal(false);
    setModoEdicion(false);
    setEmpleadoEditando(null);
    setNuevoEmpleado({ Nombre: "", Apellido: "", Telefono: "", Email: "", Cargo: "" });
    Swal.fire("Actualizado", "Empleado editado correctamente", "success");
  };

  // 🔹 Eliminar empleado
  const eliminarEmpleado = (id) => {
    Swal.fire({
      title: "¿Eliminar empleado?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setListaEmpleados(listaEmpleados.filter((p) => p.ID_Empleado !== id));
        Swal.fire("Eliminado", "El empleado fue eliminado", "success");
      }
    });
  };

  // 🔹 Spinner de carga
  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando emplados...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Lista de Empleados</h5>
        <Button
          variant="success"
          onClick={() => {
            setModoEdicion(false);
            setMostrarModal(true);
          }}
        >
          ➕ Agregar Empleado
        </Button>
      </div>

      {/* Tabla */}
      <Table striped bordered hover size="sm" responsive className="text-center">
        <thead>
          <tr>
            <BotonOrden campo="ID_Empleado" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Nombre" orden={orden} manejarOrden={manejarOrden}>Nombre</BotonOrden>
            <BotonOrden campo="Apellido" orden={orden} manejarOrden={manejarOrden}>Apellido</BotonOrden>
            <th>Telefono</th>
            <th>Email</th>
            <BotonOrden campo="Cargo" orden={orden} manejarOrden={manejarOrden}>Cargo</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosVisibles.length > 0 ? (
            empleadosVisibles.map((emp) => (
              <tr key={emp.ID_Empleado}>
                <td>{emp.ID_Empleado}</td>
                <td>{emp.Nombre}</td>
                <td>{emp.Apellido}</td>
                <td>{emp.Telefono}</td>
                <td>{emp.Email}</td>
                <td>{emp.Cargo}</td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editarEmpleado(emp)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarEmpleado(emp.ID_Empleado)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay empleado registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={listaEmpleados.length}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />

      {/* Modal para agregar o editar */}
      <ModalRegistroEmpleado
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEmpleado={nuevoEmpleado}
        manejarCambioInput={manejarCambioInput}
        agregarEmpleado={modoEdicion ? guardarEdicion : agregarEmpleado}
        modoEdicion={modoEdicion}
      />
    </div>
  );
};

export default TablaEmpleados;