import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionEmpleados = ({
  mostrarModal,
  setMostrarModal,
  empleadoSeleccionado,
  manejarCambioInput,
  guardarCambiosEmpleado,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar empleado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del empleado</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              value={empleadoSeleccionado?.Nombre || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre del empleado"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido del empleado</Form.Label>
            <Form.Control
              type="text"
              name="Apellido"
              value={empleadoSeleccionado?.Apellido || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el apellido del empleado"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={empleadoSeleccionado?.Telefono || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre o número de contacto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={empleadoSeleccionado?.Email || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el correo del proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="Cargo"
              value={empleadoSeleccionado?.Cargo || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el cargo del empleado"
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
          className="color-boton-guardar"
          onClick={guardarCambiosEmpleado}
        >
          <i className="bi bi-save-fill me-1"></i> Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionEmpleados;