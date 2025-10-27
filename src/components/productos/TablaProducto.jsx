import { Table, Spinner } from "react-bootstrap";

const TablaProductos = ({ productos, cargando }) => {

  if (cargando) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre_P</th>
            <th>Descripcion</th>
            <th>Catidad</th>
            <th>Disponible</th>
            <th>PrecioCompra</th>
            <th>PrecioVenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => {
            return (
                <tr key={producto.ID_Producto}>
                  <td>{producto.ID_Producto}</td>
                  <td>{producto.Nombre_P}</td>
                  <td>{producto.Descripcion}</td>
                  <td>{producto.Cantidad}</td>
                  <td>{producto.Disponible}</td>
                  <td>{producto.PrecioCompra}</td>
                  <td>{producto.PrecioVenta}</td>
                  <td>Acción</td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TablaProductos;