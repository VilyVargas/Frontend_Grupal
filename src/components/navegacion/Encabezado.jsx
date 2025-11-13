import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const Encabezado = () => {
const [mostrarMenu, setMostrarMenu] = useState(false);
const navigate = useNavigate();

// Alternar visibilidad del menú
const manejarToggle = () => setMostrarMenu(!mostrarMenu);

// Navegar y cerrar menú
const manejarNavegacion = (ruta) => {
navigate(ruta);
setMostrarMenu(false);
};



return (
  <Navbar expand="md" fixed="top" className="bg-black">
    <Container>
      <Navbar.Brand
        onClick={() => manejarNavegacion("/")}
        className="text-white fw-bold"
        style={{ cursor: "pointer" }}
      >
        Moto Repuestos
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="menu-offcanvas"
        onClick={manejarToggle}
        className="bg-white text-black"
      />
      <Navbar.Offcanvas
        id="menu-offcanvas"
        placement="end bg-black"
        show={mostrarMenu}
        onHide={() => setMostrarMenu(false)}
        className="bg-black text-white"
        
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu principal</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-grow-1 pe-3">

            <Nav.Link 
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/")}
            >
              {mostrarMenu ? <i className="bi-house-fill me-2"> </i> : null} Inicio
              </Nav.Link>


            <Nav.Link 
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/proveedores")}
            >
              {mostrarMenu ? <i className="bi-box2-fill me-2"> </i> : null} Proveedores
            </Nav.Link>

            <Nav.Link 
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/clientes")}
            >
              {mostrarMenu ? <i className="bi-person-circle me-2"> </i> : null} Clientes
            </Nav.Link>

            <Nav.Link
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/compras")}
            >
              {mostrarMenu ? <i className="bi-cart-fill me-2"> </i> : null} Compras
            </Nav.Link>

            <Nav.Link 
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/ventas")}
            >
              {mostrarMenu ? <i className="bi-cash-coin me-2"> </i> : null} Ventas
            </Nav.Link>

            <Nav.Link
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/productos")}
            >
              {mostrarMenu ? <i className="bi-box-fill me-2"> </i> : null}  Productos
            </Nav.Link>

            <Nav.Link
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/empleados")}
            >
              {mostrarMenu ? <i className="bi-box-fill me-2"> </i> : null}  Empleados
            </Nav.Link>

            <Nav.Link 
              className={mostrarMenu ? "color-favorito" : "text-white"}
              onClick={() => manejarNavegacion("/catalogo")}
            >
              {mostrarMenu ? <i className="bi-images me-2"> </i> : null} Catalogo
            </Nav.Link>

          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>

);

};

export default Encabezado;

