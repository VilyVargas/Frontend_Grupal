import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProductos = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  registrarProducto,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Producto</Modal.Title>
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
              placeholder="Ingrese el nombre del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="Descripcion"
              value={nuevoProducto.Descripcion || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese la descripción"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="PrecioCompra"
              value={nuevoProducto.PrecioCompra || ""}
              onChange={manejarCambioInput}
              placeholder="Precio de compra"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio venta</Form.Label>
            <Form.Control
              type="number"
              name="PrecioVenta"
              value={nuevoProducto.PrecioVenta || ""}
              onChange={manejarCambioInput}
              placeholder="Precio de venta"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="Cantidad"
              value={nuevoProducto.Cantidad || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese la cantidad"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Disponible</Form.Label>
            <Form.Select
              name="Disponible"
              value={nuevoProducto.Disponible ?? ""}
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
        <Button variant="success" onClick={registrarProducto}>
          Registrar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProductos;
