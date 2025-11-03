import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroClientes = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="Nombre1">
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={nuevoCliente.Nombre1}
              onChange={manejarCambioInput}
              placeholder="Ej: Carlos"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Nombre2">
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={nuevoCliente.Nombre2}
              onChange={manejarCambioInput}
              placeholder="Ej: Manuel"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Apellidos1">
            <Form.Label>Apellido del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Apellidos1"
              value={nuevoCliente.Apellidos1}
              onChange={manejarCambioInput}
              placeholder="Ej: Oporta"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Apellidos2">
            <Form.Label>Apellido del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Apellidos2"
              value={nuevoCliente.Apellidos2}
              onChange={manejarCambioInput}
              placeholder="Ej: Tablada"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Cedula">
            <Form.Label>Cedula del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={nuevoCliente.Cedula}
              onChange={manejarCambioInput}
              placeholder="Ej: 000-000000-000F"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Telefono">
            <Form.Label>Telefono del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={nuevoCliente.Telefono}
              onChange={manejarCambioInput}
              placeholder="Ej: 8898-2838"
              maxLength={20}
              required
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarCliente}
          disabled={!nuevoCliente.Nombre1.trim()}
        >
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroClientes;