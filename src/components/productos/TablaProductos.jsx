import { useState, useEffect } from "react";
import { Table, Button, Pagination, Spinner } from "react-bootstrap";

const TablaProductos = ({
  productos = [],
  cargando,
  abrirModalEditar,
  abrirModalEliminar,
  abrirModalAgregar,
}) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    setListaProductos(productos);
  }, [productos]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(listaProductos.length / elementosPorPagina);

  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const productosVisibles = listaProductos.slice(inicio, fin);

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
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosVisibles.length > 0 ? (
            productosVisibles.map((prd) => (
              <tr key={prd.ID_Producto}>
                <td>{prd.ID_Producto}</td>
                <td>{prd.Nombre}</td>
                <td>{prd.Precio}</td>
                <td>{prd.Cantidad}</td>
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

      {totalPaginas > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.First onClick={() => cambiarPagina(1)} disabled={paginaActual === 1} />
          <Pagination.Prev onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} />
          {[...Array(totalPaginas)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={paginaActual === i + 1}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
          <Pagination.Last onClick={() => cambiarPagina(totalPaginas)} disabled={paginaActual === totalPaginas} />
        </Pagination>
      )}
    </div>
  );
};

export default TablaProductos;
