import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaProducto from "../components/productos/TablaProducto";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProductos from "../components/productos/ModalRegistroProductos";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // 🟩 Estado correcto con los mismos nombres que la BD
  const [nuevoProducto, setNuevoProducto] = useState({
    Nombre_P: "",
    Descripcion: "",
    Cantidad: 0,
    PrecioCompra: "",
    PrecioVenta: "",
    Disponible: true,
  });

  const manejarCambioInput = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🟩 Obtener todos los productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      if (!respuesta.ok) throw new Error("Error al obtener productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
    } catch (error) {
      console.error(error.message);
    }
  };

  // 🟩 Agregar nuevo producto
  const agregarProducto = async () => {
    if (!nuevoProducto.Nombre_P.trim()) return alert("El nombre es obligatorio");

    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarproducto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre_P: nuevoProducto.Nombre_P,
          Descripcion: nuevoProducto.Descripcion,
          Cantidad: nuevoProducto.Cantidad,
          PrecioCompra: nuevoProducto.PrecioCompra,
          PrecioVenta: nuevoProducto.PrecioVenta,
          Disponible: nuevoProducto.Disponible,
        }),
      });

      if (!respuesta.ok) throw new Error("Error al guardar producto");

      // Limpia los campos y actualiza la tabla
      setNuevoProducto({
        Nombre_P: "",
        Descripcion: "",
        Cantidad: 0,
<<<<<<< HEAD
=======
        Disponible: false,
>>>>>>> c8eabad0f5afb416e69e8f51c850c4c79199c727
        PrecioCompra: "",
        PrecioVenta: "",
        Disponible: true,
      });

      setMostrarModal(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("❌ No se pudo guardar el producto.");
    }
  };

// 🔍 Actualiza solo el texto de búsqueda
const manejarCambioBusqueda = (e) => {
  setTextoBusqueda(e.target.value.toLowerCase());
};

// 🧠 Este efecto aplica el filtro automáticamente cada vez que cambia la búsqueda o la lista
useEffect(() => {
  const texto = textoBusqueda.trim().toLowerCase();

  if (texto === "") {
    // Si no hay texto, muestra todos los productos
    setProductosFiltrados(productos);
  } else {
    // Si hay texto, filtra todos los campos relevantes
    const filtrados = productos.filter((prod) => {
      return (
        prod.Nombre_P?.toLowerCase().includes(texto) ||
        prod.Descripcion?.toLowerCase().includes(texto) ||
        prod.Cantidad?.toString().includes(texto) ||
        prod.PrecioCompra?.toString().includes(texto) ||
        prod.PrecioVenta?.toString().includes(texto)
      );
    });
    setProductosFiltrados(filtrados);
  }
}, [textoBusqueda, productos]);


  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarproducto/${productoEditado.ID_Producto}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoEditado),
        }
      );
      if (!respuesta.ok) throw new Error("Error al actualizar");
      setMostrarModalEdicion(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al editar producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarproducto/${productoAEliminar.ID_Producto}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar");
      setMostrarModalEliminar(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <Container className="mt-4">
      <h4>Productos</h4>
      <Row>
        <Col lg={5} md={6} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
            + Nuevo Producto
          </Button>
        </Col>
      </Row>

      <TablaProducto
        productos={productosPaginados}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={productos.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroProductos
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
      />

      <ModalEdicionProducto
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        productoEditado={productoEditado}
        setProductoEditado={setProductoEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionProducto
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        producto={productoAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Productos;
