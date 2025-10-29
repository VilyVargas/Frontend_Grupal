import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaVentas from "../components/ventas/TablaVentas";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import TablaVentas from "../components/ventas/TablaVentas";



const Ventas = () => {

    const [ventas, setVentas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [ventasFiltrados, setventasFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const obtenerVentas = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/API/ventas");
            if (!respuesta.ok) {
                throw new Error("Error al obtener las Ventas");
            }
            const datos = await respuesta.json();
            setVentas(datos);
            setVentasFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.long(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = ventas.filter(
            (ventas) =>
                ventas.Fecha_Venta.toLowerCase().includes(texto) ||
                ventas.ID_Cliente.toLowerCase().includes(texto)
                );
        setclientesFiltrados(filtrados);
    };

    useEffect(() => {
        obtenerVentas();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Ventas</h4>

                <Row>
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

                <TablaVentas
                    ventas={ventasFiltrados}
                    cargando={cargando}
                />
            </Container>
        </>
    );
}

export default Ventas;