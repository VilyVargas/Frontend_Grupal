import { Modal, Button, Form } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
  modoEdicion,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modoEdicion ? "Editar Empleado" : "Registrar Empleado"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              value={nuevoEmpleado.Nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Carlos"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="Apellido"
              value={nuevoEmpleado.Apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Pérez"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={nuevoEmpleado.Telefono}
              onChange={manejarCambioInput}
              placeholder="Teléfono o persona de contacto"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={nuevoEmpleado.Email}
              onChange={manejarCambioInput}
              placeholder="correo@ejemplo.com"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="Cargo"
              value={nuevoEmpleado.Cargo}
              onChange={manejarCambioInput}
              placeholder="Administrador, Vendedor, etc."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant={modoEdicion ? "warning" : "success"} onClick={agregarEmpleado}>
          {modoEdicion ? "Guardar Cambios" : "Agregar Empleado"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;