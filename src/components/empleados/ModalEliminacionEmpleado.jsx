import { Modal, Button } from "react-bootstrap";

const ModalEliminacionEmpleado = ({
  mostrarModal,
  setMostrarModal,
  empleadoSeleccionado,
  confirmarEliminacionEmpleado,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Eliminar empleado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar al empleado{" "}
          <strong>{empleadoSeleccionado?.Nombre}</strong>?
        </p>
        <p className="text-muted mb-0">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacionEmpleado}>
          <i className="bi bi-trash-fill me-1"></i> Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionEmpleado;