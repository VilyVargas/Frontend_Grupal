import TablaProveedores  from "../components/proveedores/TablaProveedores";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';



const Proveedores = () =>{
  
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [proveedoresFiltrados, setproveedoresFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerProveedores = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/proveedores");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los productos");
      }
      const datos = await respuesta.json();
      setProveedores(datos);
      setproveedoresFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = proveedores.filter(
      (proveedores) =>
        proveedores.Nombre_Prov.toLowerCase().includes(texto) ||
        proveedores.Contacto.toLowerCase().includes(texto) ||
        proveedores.Email == texto 
    );
    setproveedoresFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerProveedores();
  }, []);
  return (
    <>
    <Container className="mt-4">
        <h4>Proveedores</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaProveedores 
        proveedores={proveedoresFiltrados} 
        cargando={cargando}
        />
    </Container>
    </>
  );

}
export default Proveedores;