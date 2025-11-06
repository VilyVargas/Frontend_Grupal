import React, { useState } from "react";
import { Table, Spinner, Button, Badge } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaProductos = ({
  productos,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {
  const [orden, setOrden] = useState({ campo: "ID_Producto", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const productosOrdenados = [...productos].sort((a, b) => {
    const valorA = a[orden.campo] ?? "";
    const valorB = b[orden.campo] ?? "";
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }
    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (!productos.length) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover className="mt-3 align-middle">
        <thead>
          <tr>
            <BotonOrden campo="ID_Producto" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Nombre_P" orden={orden} manejarOrden={manejarOrden}>Nombre</BotonOrden>
            <BotonOrden campo="Descripcion" orden={orden} manejarOrden={manejarOrden}>Descripción</BotonOrden>
            <BotonOrden campo="Cantidad" orden={orden} manejarOrden={manejarOrden}>Cantidad</BotonOrden>
            <BotonOrden campo="PrecioCompra" orden={orden} manejarOrden={manejarOrden}>Precio Compra</BotonOrden>
            <BotonOrden campo="PrecioVenta" orden={orden} manejarOrden={manejarOrden}>Precio Venta</BotonOrden>
            <BotonOrden campo="Disponible" orden={orden} manejarOrden={manejarOrden}>Estado</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosOrdenados.map((prod) => (
            <tr key={prod.ID_Producto}>
              <td>{prod.ID_Producto}</td>
              <td>{prod.Nombre_P}</td>
              <td>{prod.Descripcion || "-"}</td>
              <td>{prod.Cantidad}</td>
              <td>C${Number(prod.PrecioCompra).toFixed(2)}</td>
              <td>C${Number(prod.PrecioVenta).toFixed(2)}</td>
              <td>
                {prod.Disponible ? (
                  <Badge bg="success">Disponible</Badge>
                ) : (
                  <Badge bg="secondary">No disponible</Badge>
                )}
              </td>
              <td>
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

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaProductos;
