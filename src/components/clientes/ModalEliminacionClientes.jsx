import { Modal, Button } from "react-bootstrap";

const ModalEliminacionClientes = ({
  mostrarModal,
  setMostrarModal,
  clienteSeleccionado,
  confirmarEliminacionCliente,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Eliminar cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar al cliente{" "}
          <strong>
            {clienteSeleccionado?.Nombre1} {clienteSeleccionado?.Apellidos1}
          </strong>
          ?
        </p>
        <p className="text-muted mb-0">Esta acción no se puede deshacer.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacionCliente}>
          <i className="bi bi-trash-fill me-1"></i> Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionClientes;
