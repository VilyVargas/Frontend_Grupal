import { Table, Spinner } from "react-bootstrap";

const TablaClientes = ({ clientes, cargando }) => {

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
            <th>Nombre 1</th>
            <th>Nombre 2</th>
            <th>Apellido 1</th>
            <th>Apellido 2</th>
            <th>Telefono</th>
            <th>Celular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
                <tr key={cliente.ID_Cliente}>
                  <td>{cliente.ID_Cliente}</td>
                  <td>{cliente.Nombre1}</td>
                  <td>{cliente.Nombre2}</td>
                  <td>{cliente.Apellidos1}</td>
                  <td>{cliente.Apellidos2}</td>
                  <td>{cliente.Telefono}</td>
                  <td>{cliente.Cedula}</td>
                  <td>Acción</td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TablaClientes;