import { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const ModalEdicionVenta = ({
  mostrar,
  setMostrar,
  venta,
  ventaEnEdicion,
  setVentaEnEdicion,
  detalles,
  setDetalles,
  clientes,
  empleados,
  productos,
  actualizarVenta
}) => {
  const [clienteSel, setClienteSel] = useState(null);
  const [empleadoSel, setEmpleadoSel] = useState(null);
  const [productoSel, setProductoSel] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ ID_Producto: '', Cantidad_Ven: '' });

  const hoy = new Date().toISOString().split('T')[0];

  // === CARGAR CLIENTE Y EMPLEADO AL ABRIR ===
  useEffect(() => {
    if (venta && clientes.length > 0 && empleados.length > 0 && ventaEnEdicion) {
      const cliente = clientes.find(c => c.ID_Cliente === ventaEnEdicion.ID_Cliente);
      const empleado = empleados.find(e => e.ID_Empleado === ventaEnEdicion.ID_Empleado);

      setClienteSel(cliente ? {
        value: cliente.ID_Cliente,
        label: `${cliente.Nombre1} ${cliente.Apellidos1}`
      } : null);

      setEmpleadoSel(empleado ? {
        value: empleado.ID_Empleado,
        label: `${empleado.Nombre} ${empleado.Apellido}`
      } : null);
    }
  }, [venta, clientes, empleados, ventaEnEdicion]);

  // === CÁLCULO DEL TOTAL ===
  const total = detalles.reduce((s, d) => s + (d.Cantidad_ven * d.Precio_Ven), 0);

  // === CARGAR OPCIONES PARA ASYNCSELECT ===
  const cargarOpciones = (lista, campo) => (input, callback) => {
    const filtrados = lista.filter(item => {
      const valor = typeof campo === 'string'
        ? item[campo]
        : `${item.Nombre1} ${item.Apellidos1}`;
      return valor?.toLowerCase().includes(input.toLowerCase());
    });

    callback(filtrados.map(item => ({
      value: item.ID_Cliente || item.ID_Empleado || item.ID_Producto,
      label: campo === 'Nombre_Producto' ? item.Nombre_P : `${item.Nombre1} ${item.Apellidos1}`,
      precio: item.PrecioVenta

    })));
  };

  // === MANEJADORES ===
  const manejarCliente = (sel) => {
    setClienteSel(sel);
    setVentaEnEdicion(prev => ({ ...prev, ID_Cliente: sel ? sel.value : '' }));
  };

  const manejarEmpleado = (sel) => {
    setEmpleadoSel(sel);
    setVentaEnEdicion(prev => ({ ...prev, ID_Empleado: sel ? sel.value : '' }));
  };

  const manejarProducto = (sel) => {
    setProductoSel(sel);
    setNuevoDetalle(prev => ({
      ...prev,
      ID_Producto: sel ? sel.value : '',
      PrecioVenta: sel ? sel.precio : ''
    }));
  };

  const agregarDetalle = () => {
    if (!nuevoDetalle.ID_Producto || !nuevoDetalle.cantidad || nuevoDetalle.cantidad <= 0) {
      alert("Selecciona producto y cantidad válida.");
      return;
    }

    const prod = productos.find(p => p.id_producto === parseInt(nuevoDetalle.ID_Producto));
    if (!prod) return;

    if (nuevoDetalle.cantidad > prod.stock) {
      alert(`Stock insuficiente: ${prod.stock}`);
      return;
    }

    setDetalles(prev => [...prev, {
      ID_Producto: parseInt(nuevoDetalle.ID_Producto),
      nombre_producto: prod.Nombre_P,
      Cantidad_ven: parseInt(nuevoDetalle.cantidad),
      precio_unitario: parseFloat(nuevoDetalle.PrecioVenta)
    }]);

    setNuevoDetalle({ ID_Producto: '', cantidad: '' });
    setProductoSel(null);
  };

  const eliminarDetalle = (index) => {
    setDetalles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal show={mostrar} onHide={setMostrar} size="xl" fullscreen="lg-down">
      <Modal.Header closeButton>
        <Modal.Title>Editar Venta #{venta?.id_venta}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarOpciones(clientes, 'Nombre1')}
                  onChange={manejarCliente}
                  value={clienteSel}
                  placeholder="Buscar cliente..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Empleado</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarOpciones(empleados, 'Nombre')}
                  onChange={manejarEmpleado}
                  value={empleadoSel}
                  placeholder="Buscar empleado..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="text"
                  value={ventaEnEdicion?.Fecha_Venta || ''}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h5>Productos</h5>
          <Row>
            <Col md={5}>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={cargarOpciones(productos, 'Nombre_P')}
                onChange={manejarProducto}
                value={productoSel}
                placeholder="Buscar producto..."
                isClearable
              />
            </Col>
            <Col md={3}>
              <FormControl
                type="number"
                placeholder="Cantidad"
                value={nuevoDetalle.cantidad}
                onChange={e => setNuevoDetalle(prev => ({ ...prev, cantidad: e.target.value }))}
                min="1"
              />
            </Col>
            <Col md={4}>
              <Button variant="success" onClick={agregarDetalle} style={{ width: '100%' }}>
                Agregar
              </Button>
            </Col>
          </Row>

          {detalles.length > 0 && (
            <Table striped className="mt-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.Nombre_P}</td>
                    <td>{d.cantidad}</td>
                    <td>C$ {d.Precio_Ven.toFixed(2)}</td>
                    <td>C$ {(d.Cantidad_ven * d.Precio_Ven).toFixed(2)}</td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => eliminarDetalle(i)}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                  <td colSpan={2}><strong>C$ {total.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={setMostrar}>Cancelar</Button>
        <Button variant="primary" onClick={actualizarVenta}>Actualizar Venta</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionVenta;