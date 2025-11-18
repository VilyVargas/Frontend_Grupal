import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionProductos = ({
  mostrarModal,
  setMostrarModal,
  productoSeleccionado,
  manejarCambioInput,
  guardarCambiosProducto,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered backdrop="static">
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
              value={productoSeleccionado?.Nombre_P || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="PrecioCompra"
              value={productoSeleccionado?.PrecioCompra || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="Cantidad"
              value={productoSeleccionado?.Cantidad || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio venta</Form.Label>
            <Form.Control
              type="number"
              name="PrecioVenta"
              value={productoSeleccionado?.PrecioVenta || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="Descripcion"
              value={productoSeleccionado?.Descripcion || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Disponible</Form.Label>
            <Form.Select
              name="Disponible"
              value={productoSeleccionado?.Disponible ?? ""}
              onChange={manejarCambioInput}
            >
              <option value="">Seleccione</option>
              <option value={true}>Sí</option>
              <option value={false}>No</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={guardarCambiosProducto}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProductos;
