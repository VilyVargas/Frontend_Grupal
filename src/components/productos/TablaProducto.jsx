import React, { useState } from "react";
import { Table, Spinner, Button, Row, Col } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaProducto = ({
  productos = [], // ✅ Valor por defecto para evitar errores
  cargando = false, // ✅ Por si usas un estado de carga
  abrirModalEdicion,
  abrirModalEliminacion,
  abrirModalAgregar, // opcional
  totalElementos = 0,
  elementosPorPagina = 5,
  paginaActual = 1,
  establecerPaginaActual,
}) => {
  const [orden, setOrden] = useState({ campo: "ID_Producto", direccion: "asc" });

  // 🔽 Control de ordenamiento
  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  // 🔽 Ordenar productos según la columna seleccionada
  const productosOrdenados = [...productos].sort((a, b) => {
    const valorA = a[orden.campo] ?? "";
    const valorB = b[orden.campo] ?? "";
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }
    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  // 🔽 Estado de carga
  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  // 🔽 Si no hay productos
  if (!productos.length) {
    return (
      <div className="text-center mt-4">
        <h6 className="text-muted">No hay productos registrados.</h6>
        {abrirModalAgregar && (
          <Button variant="success" onClick={abrirModalAgregar} className="mt-3">
            <i className="bi bi-plus-circle me-2"></i>Agregar producto
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* 🔹 Encabezado con botón */}
      <Row className="align-items-center mb-2 mt-3">
        <Col>
          <h5 className="fw-bold text-secondary mb-0">Lista de Productos</h5>
        </Col>
        {abrirModalAgregar && (
          <Col className="text-end">
            <Button
              variant="success"
              size="sm"
              onClick={abrirModalAgregar}
              className="shadow-sm"
            >
              <i className="bi bi-plus-circle me-2"></i>Agregar producto
            </Button>
          </Col>
        )}
      </Row>

      {/* 🔹 Tabla de productos */}
      <Table striped bordered hover responsive size="sm" className="align-middle shadow-sm">
        <thead className="table-light">
          <tr>
            <BotonOrden campo="ID_Producto" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>
            <BotonOrden campo="Nombre_P" orden={orden} manejarOrden={manejarOrden}>
              Nombre
            </BotonOrden>
            <BotonOrden campo="Descripcion" orden={orden} manejarOrden={manejarOrden}>
              Descripción
            </BotonOrden>
            <BotonOrden campo="Precio" orden={orden} manejarOrden={manejarOrden}>
              Precio
            </BotonOrden>
            <BotonOrden campo="Cantidad" orden={orden} manejarOrden={manejarOrden}>
              Stock
            </BotonOrden>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosOrdenados.map((prod) => (
            <tr key={prod.ID_Producto}>
              <td>{prod.ID_Producto}</td>
              <td>{prod.Nombre_P}</td>
              <td>{prod.Descripcion || "-"}</td>
              <td>${Number(prod.Precio).toFixed(2)}</td>
              <td>{prod.Cantidad}</td>
              <td className="text-center">
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(prod)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(prod)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔹 Paginación */}
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaProducto;
