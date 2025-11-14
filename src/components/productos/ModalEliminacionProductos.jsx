import { Modal, Button } from "react-bootstrap";

const ModalEliminacionProductos = ({
  mostrarModal,
  setMostrarModal,
  productoSeleccionado,
  confirmarEliminacionProducto,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Eliminar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar el producto{" "}
          <strong>{productoSeleccionado?.Nombre}</strong>?
        </p>
        <p className="text-muted mb-0">Esta acción no se puede deshacer.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacionProducto}>
          🗑️ Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionProductos;
