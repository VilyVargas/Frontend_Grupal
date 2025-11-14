import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionClientes = ({
  mostrarModal,
  setMostrarModal,
  clienteSeleccionado,
  manejarCambioInput,
  guardarCambiosCliente,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Primer nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={clienteSeleccionado?.Nombre1 || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el primer nombre"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Segundo nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={clienteSeleccionado?.Nombre2 || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el segundo nombre (opcional)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Primer apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellidos1"
              value={clienteSeleccionado?.Apellidos1 || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el primer apellido"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Segundo apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellidos2"
              value={clienteSeleccionado?.Apellidos2 || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el segundo apellido (opcional)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={clienteSeleccionado?.Cedula || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese la cédula del cliente"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={clienteSeleccionado?.Telefono || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el teléfono del cliente"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button className="color-boton-guardar" onClick={guardarCambiosCliente}>
          <i className="bi bi-save-fill me-1"></i> Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionClientes;
