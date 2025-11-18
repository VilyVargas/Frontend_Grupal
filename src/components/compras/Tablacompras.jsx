import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroCompras from "./ModalRegistroCompras";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaCompras = ({ compras = [], cargando }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [compraEditando, setCompraEditando] = useState(null);

  const [nuevaCompra, setNuevaCompra] = useState({
    Fecha_compra: "",
    ID_Proveedor: "",
    ID_Empleado: "",
    Total_Compra: "",
  });

  const [listaCompras, setListaCompras] = useState([]);
  const [orden, setOrden] = useState({ campo: null, direccion: "asc" });

  // 🔹 Cargar compras iniciales
  useEffect(() => {
    setListaCompras(compras);
  }, [compras]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaCompras.length / elementosPorPagina);

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

  const listaOrdenada = ordenarLista(listaCompras);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const comprasVisibles = listaOrdenada.slice(inicio, fin);

  const manejarOrden = (campo) => {
    setPaginaActual(1);
    setOrden((prev) => (prev.campo === campo ? { ...prev, direccion: prev.direccion === "asc" ? "desc" : "asc" } : { campo, direccion: "asc" }));
  };

  // 🔹 Cambio de página
  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) setPaginaActual(num);
  };

  // 🔹 Manejo inputs
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCompra((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Agregar compra
  const agregarCompra = () => {
    if (!nuevaCompra.Fecha_compra || !nuevaCompra.Total_Compra) {
      Swal.fire(
        "Campos requeridos",
        "Debe ingresar la fecha de compra y total.",
        "warning"
      );
      return;
    }

    const nueva = {
      ID_Compra: listaCompras.length + 1,
      ...nuevaCompra,
    };

    setListaCompras([...listaCompras, nueva]);
    setMostrarModal(false);

    setNuevaCompra({
      Fecha_compra: "",
      ID_Proveedor: "",
      ID_Empleado: "",
      Total_Compra: "",
    });

    Swal.fire("Éxito", "Compra registrada correctamente", "success");
  };

  // 🔹 Editar compra
  const editarCompra = (compra) => {
    setModoEdicion(true);
    setCompraEditando(compra);

    setNuevaCompra({
      Fecha_compra: compra.Fecha_compra,
      ID_Proveedor: compra.ID_Proveedor,
      ID_Empleado: compra.ID_Empleado,
      Total_Compra: compra.Total_Compra,
    });

    setMostrarModal(true);
  };

  // 🔹 Guardar cambios
  const guardarEdicion = () => {
    setListaCompras(
      listaCompras.map((c) =>
        c.ID_Compra === compraEditando.ID_Compra ? { ...c, ...nuevaCompra } : c
      )
    );

    setMostrarModal(false);
    setModoEdicion(false);
    setCompraEditando(null);

    setNuevaCompra({
      Fecha_compra: "",
      ID_Proveedor: "",
      ID_Empleado: "",
      Total_Compra: "",
    });

    Swal.fire("Actualizado", "Compra editada correctamente", "success");
  };

  // 🔹 Eliminar compra
  const eliminarCompra = (id) => {
    Swal.fire({
      title: "¿Eliminar compra?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((r) => {
      if (r.isConfirmed) {
        setListaCompras(listaCompras.filter((c) => c.ID_Compra !== id));
        Swal.fire("Eliminada", "La compra fue eliminada.", "success");
      }
    });
  };

  // 🔹 Spinner de carga
  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando compras...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Lista de Compras</h5>
        <Button
          variant="success"
          onClick={() => {
            setModoEdicion(false);
            setMostrarModal(true);
          }}
        >
          ➕ Registrar Compra
        </Button>
      </div>

      {/* Tabla */}
      <Table striped bordered hover size="sm" responsive className="text-center">
        <thead>
          <tr>
            <BotonOrden campo="ID_Compra" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Fecha_compra" orden={orden} manejarOrden={manejarOrden}>Fecha</BotonOrden>
            <th>ID Proveedor</th>
            <th>ID Empleado</th>
            <BotonOrden campo="Total_Compra" orden={orden} manejarOrden={manejarOrden}>Total Compra</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {comprasVisibles.length > 0 ? (
            comprasVisibles.map((c) => (
              <tr key={c.ID_Compra}>
                <td>{c.ID_Compra}</td>
                <td>{c.Fecha_compra}</td>
                <td>{c.ID_Proveedor}</td>
                <td>{c.ID_Empleado}</td>
                <td>C$ {Number(c.Total_Compra).toFixed(2)}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editarCompra(c)}
                  >
                    ✏️ Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarCompra(c.ID_Compra)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay compras registradas.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={listaCompras.length}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />

      {/* Modal */}
      <ModalRegistroCompras
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCompra={nuevaCompra}
        manejarCambioInput={manejarCambioInput}
        agregarCompra={modoEdicion ? guardarEdicion : agregarCompra}
        modoEdicion={modoEdicion}
      />
    </div>
  );
};

export default TablaCompras;
