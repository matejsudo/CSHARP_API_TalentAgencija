import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";
import SmjerService from "../../services/SmjerService";



export default function SmjeroviDodaj(){

    const navigate = useNavigate();

    async function dodaj(smjer){
        //console.log(smjer);
        //console.log(JSON.stringify(smjer));
        const odgovor = await SmjerService.dodaj(smjer);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.SMJER_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            naziv: podaci.get('naziv'), // 'naziv' je došao iz atributa name od Form.Control
            trajanje: parseInt(podaci.get('trajanje')),
            izvodiSeOd: moment.utc(podaci.get('izvodiSeOd')),
            vaucer: podaci.get('vaucer')=='on' ? true : false
        });

    }

    return(
        <Container>
            Dodavanje novog smjera
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="number" name="trajanje" min={0} max={500} />
                </Form.Group>

                <Form.Group controlId="izvodiSeOd">
                    <Form.Label>Izvodi se od</Form.Label>
                    <Form.Control type="date" name="izvodiSeOd"  />
                </Form.Group>

                <Form.Group controlId="vaucer">
                    <Form.Check label="Vaučer" name="vaucer" />
                </Form.Group>


                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.SMJER_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Dodaj novi smjer
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}