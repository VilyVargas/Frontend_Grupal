import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroProveedores from "./ModalRegistroProveedores";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaProveedores = ({ proveedores = [], cargando }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    Nombre_Prov: "",
    Contacto: "",
    Email: "",
  });
  const [listaProveedores, setListaProveedores] = useState([]);
  const [orden, setOrden] = useState({ campo: null, direccion: "asc" });

  //  Cargar proveedores iniciales
  useEffect(() => {
    setListaProveedores(proveedores);
  }, [proveedores]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaProveedores.length / elementosPorPagina);

  //  Cálculo de proveedores visibles
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

  const listaOrdenada = ordenarLista(listaProveedores);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const proveedoresVisibles = listaOrdenada.slice(inicio, fin);

  const manejarOrden = (campo) => {
    setPaginaActual(1);
    setOrden((prev) => (prev.campo === campo ? { ...prev, direccion: prev.direccion === "asc" ? "desc" : "asc" } : { campo, direccion: "asc" }));
  };

  //  Cambio de página
  const cambiarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaActual(numero);
    }
  };

  //  Manejo de inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor((prev) => ({ ...prev, [name]: value }));
  };

  //  Agregar proveedor
  const agregarProveedor = () => {
    if (!nuevoProveedor.Nombre_Prov.trim()) {
      Swal.fire("Campo requerido", "Debes ingresar un nombre de proveedor", "warning");
      return;
    }

    const nuevo = {
      ID_Proveedor: listaProveedores.length + 1,
      ...nuevoProveedor,
    };

    setListaProveedores([...listaProveedores, nuevo]);
    setMostrarModal(false);
    setNuevoProveedor({ Nombre_Prov: "", Contacto: "", Email: "" });
    setPaginaActual(Math.ceil((listaProveedores.length + 1) / elementosPorPagina));

    Swal.fire("Éxito", "Proveedor agregado correctamente", "success");
  };

  //  Editar proveedor
  const editarProveedor = (proveedor) => {
    setModoEdicion(true);
    setProveedorEditando(proveedor);
    setNuevoProveedor({
      Nombre_Prov: proveedor.Nombre_Prov,
      Contacto: proveedor.Contacto,
      Email: proveedor.Email,
    });
    setMostrarModal(true);
  };

  //  Guardar cambios del proveedor editado
  const guardarEdicion = () => {
    setListaProveedores(
      listaProveedores.map((p) =>
        p.ID_Proveedor === proveedorEditando.ID_Proveedor
          ? { ...p, ...nuevoProveedor }
          : p
      )
    );
    setMostrarModal(false);
    setModoEdicion(false);
    setProveedorEditando(null);
    setNuevoProveedor({ Nombre_Prov: "", Contacto: "", Email: "" });
    Swal.fire("Actualizado", "Proveedor editado correctamente", "success");
  };

  //  Eliminar proveedor
  const eliminarProveedor = (id) => {
    Swal.fire({
      title: "¿Eliminar proveedor?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setListaProveedores(listaProveedores.filter((p) => p.ID_Proveedor !== id));
        Swal.fire("Eliminado", "El proveedor fue eliminado", "success");
      }
    });
  };

  //  Spinner de carga
  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando proveedores...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Lista de Proveedores</h5>
        <Button
          variant="success"
          onClick={() => {
            setModoEdicion(false);
            setMostrarModal(true);
          }}
        >
          ➕ Agregar Proveedor
        </Button>
      </div>

      {/* Tabla */}
      <Table striped bordered hover size="sm" responsive className="text-center">
        <thead>
          <tr>
            <BotonOrden campo="ID_Proveedor" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Nombre_Prov" orden={orden} manejarOrden={manejarOrden}>Nombre</BotonOrden>
            <BotonOrden campo="Contacto" orden={orden} manejarOrden={manejarOrden}>Contacto</BotonOrden>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresVisibles.length > 0 ? (
            proveedoresVisibles.map((prov) => (
              <tr key={prov.ID_Proveedor}>
                <td>{prov.ID_Proveedor}</td>
                <td>{prov.Nombre_Prov}</td>
                <td>{prov.Contacto}</td>
                <td>{prov.Email}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editarProveedor(prov)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProveedor(prov.ID_Proveedor)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay proveedores registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={listaProveedores.length}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />

      {/* Modal para agregar o editar */}
      <ModalRegistroProveedores
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProveedor={nuevoProveedor}
        manejarCambioInput={manejarCambioInput}
        agregarProveedor={modoEdicion ? guardarEdicion : agregarProveedor}
        modoEdicion={modoEdicion}
      />
    </div>
  );
};

export default TablaProveedores;
