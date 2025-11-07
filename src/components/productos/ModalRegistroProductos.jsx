import { Modal, Button, Form } from "react-bootstrap";

const ModalRegistroProductos = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar nuevo producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_P"
              value={nuevoProducto.Nombre_P || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese nombre del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="Descripcion"
              value={nuevoProducto.Descripcion || ""}
              onChange={manejarCambioInput}
              placeholder="Descripción del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="Cantidad"
              value={nuevoProducto.Cantidad || ""}
              onChange={manejarCambioInput}
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Compra</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="PrecioCompra"
              value={nuevoProducto.PrecioCompra || ""}
              onChange={manejarCambioInput}
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Venta</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="PrecioVenta"
              value={nuevoProducto.PrecioVenta || ""}
              onChange={manejarCambioInput}
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Disponible"
              name="Disponible"
              checked={nuevoProducto.Disponible || false}
              onChange={manejarCambioInput}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button className="color-boton-guardar" onClick={agregarProducto}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProductos;
