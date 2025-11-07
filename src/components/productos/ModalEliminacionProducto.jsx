import { Modal, Button } from "react-bootstrap";

const ModalEliminacionProducto = ({
  mostrar,
  setMostrar,
  producto,
  confirmarEliminacion,
}) => {
  if (!producto) return null;

  const manejarConfirmacion = () => {
    confirmarEliminacion();
    setMostrar(false); // Cierra el modal automáticamente al confirmar
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        ¿Estás seguro de que deseas eliminar el producto{" "}
        <strong>{producto.Nombre_P}</strong>? <br />
        <span className="text-danger">Esta acción no se puede deshacer.</span>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={manejarConfirmacion}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionProducto;
