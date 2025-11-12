import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionProveedores = ({
  mostrarModal,
  setMostrarModal,
  proveedorSeleccionado,
  manejarCambioInput,
  guardarCambiosProveedor,
}) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar proveedor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del proveedor</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_Prov"
              value={proveedorSeleccionado?.Nombre_Prov || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre del proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              type="text"
              name="Contacto"
              value={proveedorSeleccionado?.Contacto || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre o número de contacto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={proveedorSeleccionado?.Email || ""}
              onChange={manejarCambioInput}
              placeholder="Ingrese el correo del proveedor"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          className="color-boton-guardar"
          onClick={guardarCambiosProveedor}
        >
          <i className="bi bi-save-fill me-1"></i> Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProveedores;
