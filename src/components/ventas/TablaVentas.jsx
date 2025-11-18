import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalRegistroVentas from "../ventas/ModalRegistroVentas";
import ModalEdicionVentas from "../ventas/ModalEdicionVentas";
import ModalEliminacionVentas from "../ventas/ModalEliminacionVentas";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaVentas = ({
  ventas = [],
  cargando,
  abrirModalEditar,
  abrirModalEliminar,
  abrirModalAgregar,
}) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [listaVentas, setListaVentas] = useState([]);
  const [orden, setOrden] = useState({ campo: null, direccion: "asc" });

  // Cargar ventas iniciales
  useEffect(() => {
    setListaVentas(ventas);
  }, [ventas]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaVentas.length / elementosPorPagina);

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

  const listaOrdenada = ordenarLista(listaVentas);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const ventasVisibles = listaOrdenada.slice(inicio, fin);

  const manejarOrden = (campo) => {
    setPaginaActual(1);
    setOrden((prev) => (prev.campo === campo ? { ...prev, direccion: prev.direccion === "asc" ? "desc" : "asc" } : { campo, direccion: "asc" }));
  };

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
            <BotonOrden campo="ID_Venta" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Fecha_Venta" orden={orden} manejarOrden={manejarOrden}>Fecha</BotonOrden>
            <th>ID Cliente</th>
            <th>ID Empleado</th>
            <BotonOrden campo="Total_Venta" orden={orden} manejarOrden={manejarOrden}>Total</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ventasVisibles.length > 0 ? (
            ventasVisibles.map((vta) => (
              <tr key={vta.ID_Venta}>
                <td>{vta.ID_Venta}</td>
                <td>{vta.Fecha_Venta}</td>
                <td>{vta.ID_Cliente}</td>
                <td>{vta.ID_Empleado}</td>
                <td>{vta.Total_Venta}</td>
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

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={listaVentas.length}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />
    </div>
  );
};

export default TablaVentas;
