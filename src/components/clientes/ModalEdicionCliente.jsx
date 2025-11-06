import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionCliente = ({
  mostrar,
  setMostrar,
  clienteEditado,
  setClienteEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setClienteEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Nombre1">
                <Form.Label>Primer Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre1"
                  value={clienteEditado?.Nombre1 || ""}
                  onChange={manejarCambio}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Nombre2">
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre2"
                  value={clienteEditado?.Nombre2 || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Apellidos1">
                <Form.Label>Primer Apellido *</Form.Label>
                <Form.Control
                  type="text"
                  name="Apellidos1"
                  value={clienteEditado?.Apellidos1 || ""}
                  onChange={manejarCambio}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Apellidos2">
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="Apellidos2"
                  value={clienteEditado?.Apellidos2 || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Cedula">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="text"
                  name="Cedula"
                  value={clienteEditado?.Cedula || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="Telefono"
                  value={clienteEditado?.Telefono || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!clienteEditado?.Nombre1?.trim() || !clienteEditado?.Apellidos1?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCliente;
