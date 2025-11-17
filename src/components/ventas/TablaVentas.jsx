import { useState, useEffect } from "react";
import { Table, Button, Pagination, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroVentas from "../ventas/ModalRegistroVentas";
import ModalEdicionVentas from "../ventas/ModalEdicionVentas";
import ModalEliminacionVentas from "../ventas/ModalEliminacionVentas";

const TablaVentas = ({
  ventas = [],
  cargando,
  abrirModalEditar,
  abrirModalEliminar,
  abrirModalAgregar,
}) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [listaVentas, setListaVentas] = useState([]);

  // Cargar ventas iniciales
  useEffect(() => {
    setListaVentas(ventas);
  }, [ventas]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaVentas.length / elementosPorPagina);

  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const ventasVisibles = listaVentas.slice(inicio, fin);

  const cambiarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaActual(numero);
    }
  };

  // Spinner de carga
  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando ventas...</p>
      </div>
    );
  }

  return (
    <div className="text-center">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Lista de Ventas</h5>
        <Button variant="success" onClick={abrirModalAgregar}>
          ➕ Agregar Venta
        </Button>
      </div>

      {/* Tabla */}
      <Table striped bordered hover size="sm" responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>ID Cliente</th>
            <th>ID Empleado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ventasVisibles.length > 0 ? (
            ventasVisibles.map((vta) => (
              <tr key={vta.ID_Venta}>
                <td>{vta.ID_Venta}</td>
                <td>{vta.Fecha}</td>
                <td>{vta.ID_Cliente}</td>
                <td>{vta.ID_Empleado}</td>
                <td>{vta.Total}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(vta)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => abrirModalEliminar(vta)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay ventas registradas.</td>
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
    </div>
  );
};

export default TablaVentas;
