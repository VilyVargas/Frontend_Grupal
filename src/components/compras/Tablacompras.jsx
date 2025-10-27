import { Table, Spinner } from "react-bootstrap";

const TablaCompras = ({ compras, cargando }) => {

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
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>ID_Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => {
            return (
                <tr key={compra.ID_Compra}>
                  <td>{compra.ID_Compra}</td>
                  <td>{compra.Fecha_compra}</td>
                  <td>{compra.Cantidad}</td>
                  <td>{compra.ID_Proveedor}</td>
                  <td>Acción</td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TablaCompras;