import { Modal, Button, Form } from "react-bootstrap";

const ModalRegistroClientes = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  modoEdicion,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {modoEdicion ? "Editar Cliente" : "Registrar Cliente"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={nuevoCliente.Nombre1}
              onChange={manejarCambioInput}
              placeholder="Ej: Juan"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={nuevoCliente.Nombre2}
              onChange={manejarCambioInput}
              placeholder="Ej: Carlos"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellidos1"
              value={nuevoCliente.Apellidos1}
              onChange={manejarCambioInput}
              placeholder="Ej: López"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellidos2"
              value={nuevoCliente.Apellidos2}
              onChange={manejarCambioInput}
              placeholder="Ej: Pérez"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={nuevoCliente.Cedula}
              onChange={manejarCambioInput}
              placeholder="Ej: 001-123456-7890X"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={nuevoCliente.Telefono}
              onChange={manejarCambioInput}
              placeholder="Ej: 8888-8888"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant={modoEdicion ? "warning" : "success"}
          onClick={agregarCliente}
        >
          {modoEdicion ? "Guardar Cambios" : "Agregar Cliente"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroClientes;
