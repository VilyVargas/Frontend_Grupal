import { useState, useEffect } from "react";
import { Table, Button, Pagination, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroCompras from "./ModalRegistroCompras";

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

  // 🔹 Cargar compras iniciales
  useEffect(() => {
    setListaCompras(compras);
  }, [compras]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaCompras.length / elementosPorPagina);

  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const comprasVisibles = listaCompras.slice(inicio, fin);

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
            <th>ID</th>
            <th>Fecha</th>
            <th>ID Proveedor</th>
            <th>ID Empleado</th>
            <th>Total Compra</th>
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
