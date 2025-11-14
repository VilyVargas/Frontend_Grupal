import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionVentas = ({
  mostrarModal,
  setMostrarModal,
  ventaSeleccionada,
  manejarCambioInput,
  guardarCambiosVenta,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Venta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="Fecha"
              value={ventaSeleccionada?.Fecha || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              name="Cliente"
              value={ventaSeleccionada?.Cliente || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              name="Total"
              value={ventaSeleccionada?.Total || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={guardarCambiosVenta}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionVentas;
