import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Modal,
} from "react-bootstrap";

const Login = ({ tipo = "principal", entidad = null }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  const navigate = useNavigate();

  //  Usuarios simulados
  const usuariosRegistrados = [
    { usuario: "admin", password: "1234" },
    { usuario: "ariel", password: "2601" },
    { usuario: "Kristing", password: "Tablada123" },
  ];

  const manejarEnvio = (e) => {
    e.preventDefault();

    const usuarioValido = usuariosRegistrados.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (usuarioValido) {
      setMensaje("Inicio de sesión exitoso ✅");
      setTipoMensaje("success");

      setTimeout(() => {
        if (tipo === "principal") {
          localStorage.setItem("usuario", usuario);
          navigate("/inicio");
        } else {
          setAutenticado(true);
        }
      }, 800);
    } else {
      setMensaje("Usuario o contraseña incorrectos ❌");
      setTipoMensaje("danger");
    }
  };

  const manejarRecuperacion = (e) => {
    e.preventDefault();

    if (!correoRecuperacion.includes("@")) {
      setMensajeRecuperacion("Por favor, ingrese un correo válido.");
      return;
    }

    setMensajeRecuperacion(
      "📩 Se ha enviado un enlace de recuperación a su correo."
    );

    setTimeout(() => {
      setMostrarModal(false);
      setCorreoRecuperacion("");
      setMensajeRecuperacion("");
    }, 3000);
  };

  // 🔹 Si el login es para entidad y ya se autenticó → mostrar entidad
  if (tipo === "entidad" && autenticado && entidad) {
    return entidad;
  }

  // 🔹 El login principal YA NO REDIRIGE automáticamente
  //     Permite escribir usuario y contraseña siempre

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 text-primary fw-bold">
                {tipo === "entidad"
                  ? "Ingrese sus Credenciales"
                  : "Iniciar Sesión"}
              </h3>

              {mensaje && <Alert variant={tipoMensaje}>{mensaje}</Alert>}

              <Form onSubmit={manejarEnvio}>
                <Form.Group controlId="formUsuario" className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Ingresar
                  </Button>
                </div>
              </Form>

              {tipo === "principal" && (
                <div className="text-center mt-3">
                  <Button
                    variant="link"
                    className="text-decoration-none"
                    onClick={() => setMostrarModal(true)}
                  >
                    ¿Olvidó su contraseña?
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Recuperación */}
      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensajeRecuperacion ? (
            <Alert variant="info" className="text-center">
              {mensajeRecuperacion}
            </Alert>
          ) : (
            <>
              <p className="text-muted mb-3">
                Ingrese su correo y le enviaremos un enlace.
              </p>

              <Form onSubmit={manejarRecuperacion}>
                <Form.Group controlId="formCorreoRecuperacion">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={correoRecuperacion}
                    onChange={(e) => setCorreoRecuperacion(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid mt-3">
                  <Button variant="primary" type="submit">
                    Enviar enlace
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login;
