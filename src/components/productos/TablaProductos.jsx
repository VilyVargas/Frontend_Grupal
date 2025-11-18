import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaProductos = ({
  productos = [],
  cargando,
  abrirModalEditar,
  abrirModalEliminar,
  abrirModalAgregar,
}) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [listaProductos, setListaProductos] = useState([]);
  const [orden, setOrden] = useState({ campo: null, direccion: "asc" });

  useEffect(() => {
    setListaProductos(productos);
  }, [productos]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaProductos.length / elementosPorPagina);

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

  const listaOrdenada = ordenarLista(listaProductos);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const productosVisibles = listaOrdenada.slice(inicio, fin);

  const manejarOrden = (campo) => {
    setPaginaActual(1);
    setOrden((prev) => (prev.campo === campo ? { ...prev, direccion: prev.direccion === "asc" ? "desc" : "asc" } : { campo, direccion: "asc" }));
  };

  const cambiarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) setPaginaActual(numero);
  };

  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Lista de Productos</h5>
        <Button variant="success" onClick={abrirModalAgregar}>
          ➕ Agregar Producto
        </Button>
      </div>

      <Table striped bordered hover size="sm" responsive className="text-center">
        <thead>
          <tr>
            <BotonOrden campo="ID_Producto" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Nombre_P" orden={orden} manejarOrden={manejarOrden}>Nombre</BotonOrden>
            <th>Descripción</th>
            <BotonOrden campo="Cantidad" orden={orden} manejarOrden={manejarOrden}>Cantidad</BotonOrden>
            <th>Disponible</th>
            <BotonOrden campo="PrecioCompra" orden={orden} manejarOrden={manejarOrden}>Precio compra</BotonOrden>
            <BotonOrden campo="PrecioVenta" orden={orden} manejarOrden={manejarOrden}>Precio venta</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosVisibles.length > 0 ? (
            productosVisibles.map((prd) => (
              <tr key={prd.ID_Producto}>
                <td>{prd.ID_Producto}</td>
                <td>{prd.Nombre_P}</td>
                <td>{prd.Descripcion}</td>
                <td>{prd.Cantidad}</td>
                <td>{prd.Disponible}</td>
                <td>{prd.PrecioCompra}</td>
                <td>{prd.PrecioVenta}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(prd)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => abrirModalEliminar(prd)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={listaProductos.length}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />
    </div>
  );
};

export default TablaProductos;
