import { Table, Spinner } from "react-bootstrap";

const TablaVentas = ({ ventas, cargando }) => {

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
            <th>ID_Venta</th>
            <th>Fecha_Venta</th>
              <th>ID_Cliente</th>
          <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            return (
                <tr key={cliente.ID_Venta}>
                  <td>{cliente.ID_Venta}</td>
                  <td>{cliente.Fecha_Venta}</td>
                  <td>{cliente.ID_Cliente}</td>

                  <td>Acción</td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TablaVentas;