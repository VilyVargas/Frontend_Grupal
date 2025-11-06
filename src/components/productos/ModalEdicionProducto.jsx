import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setProductoEditado((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Nombre_P">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre_P"
                  value={productoEditado?.Nombre_P || ""}
                  onChange={manejarCambio}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Cantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  name="Cantidad"
                  value={productoEditado?.Cantidad || 0}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="Descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="Descripcion"
              value={productoEditado?.Descripcion || ""}
              onChange={manejarCambio}
              rows={2}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="PrecioCompra">
                <Form.Label>Precio Compra (C$)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="PrecioCompra"
                  value={productoEditado?.PrecioCompra || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="PrecioVenta">
                <Form.Label>Precio Venta (C$)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="PrecioVenta"
                  value={productoEditado?.PrecioVenta || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="Disponible">
            <Form.Check
              type="checkbox"
              label="Disponible para la venta"
              name="Disponible"
              checked={!!productoEditado?.Disponible}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!productoEditado?.Nombre_P?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
