import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaClientes = ({
  clientes,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {
  const [orden, setOrden] = useState({ campo: "ID_Cliente", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const clientesOrdenados = [...clientes].sort((a, b) => {
    const valorA = a[orden.campo] ?? "";
    const valorB = b[orden.campo] ?? "";
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }
    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (!clientes.length) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Cargando clientes...</p>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover className="mt-3 align-middle">
        <thead>
          <tr>
            <BotonOrden campo="ID_Cliente" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="Nombre1" orden={orden} manejarOrden={manejarOrden}>Primer Nombre</BotonOrden>
            <BotonOrden campo="Apellidos1" orden={orden} manejarOrden={manejarOrden}>Primer Apellido</BotonOrden>
            <BotonOrden campo="Cedula" orden={orden} manejarOrden={manejarOrden}>Cédula</BotonOrden>
            <BotonOrden campo="Telefono" orden={orden} manejarOrden={manejarOrden}>Teléfono</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesOrdenados.map((cli) => (
            <tr key={cli.ID_Cliente}>
              <td>{cli.ID_Cliente}</td>
              <td>{cli.Nombre1} {cli.Nombre2 || ""}</td>
              <td>{cli.Apellidos1} {cli.Apellidos2 || ""}</td>
              <td>{cli.Cedula || "-"}</td>
              <td>{cli.Telefono || "-"}</td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(cli)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(cli)}
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

export default TablaClientes;
