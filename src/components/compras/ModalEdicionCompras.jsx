import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionCompras = ({
  mostrarModal,
  setMostrarModal,
  compraSeleccionada,
  manejarCambioInput,
  guardarCambiosCompra,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar compra</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Control
              type="text"
              name="Producto"
              value={compraSeleccionada?.Producto || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="Cantidad"
              value={compraSeleccionada?.Cantidad || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese la cantidad"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              name="Precio"
              value={compraSeleccionada?.Precio || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el precio unidad"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="Proveedor"
              value={compraSeleccionada?.Proveedor || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de compra</Form.Label>
            <Form.Control
              type="date"
              name="Fecha"
              value={compraSeleccionada?.Fecha || ""}
              onChange={manejarCambioInput}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button className="color-boton-guardar" onClick={guardarCambiosCompra}>
          <i className="bi bi-save-fill me-1"></i> Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCompras;
