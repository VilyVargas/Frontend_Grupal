import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  if (!productoEditado) return null;

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setProductoEditado((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_P"
              value={productoEditado.Nombre_P || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="Descripcion"
              value={productoEditado.Descripcion || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="Cantidad"
              value={productoEditado.Cantidad || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              type="number"
              name="PrecioCompra"
              step="0.01"
              value={productoEditado.PrecioCompra || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              type="number"
              name="PrecioVenta"
              step="0.01"
              value={productoEditado.PrecioVenta || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="Disponible"
              label="Disponible"
              checked={productoEditado.Disponible === 1 || productoEditado.Disponible === true}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button className="color-boton-guardar" onClick={guardarEdicion}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
