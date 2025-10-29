import { Table, Spinner } from "react-bootstrap";

const TablaProveedores = ({ proveedores, cargando }) => {

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
            <th>Nombre_Prov</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedores) => {
            return (
                <tr key={proveedores.ID_Proveedor}>
                  <td>{proveedores.ID_Proveedor}</td>
                  <td>{proveedores.Nombre_Prov}</td>
                  <td>{proveedores.Contacto}</td>
                  <td>{proveedores.Email}</td>
                  <td>Acción</td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default <TablaProveedores></TablaProveedores>;