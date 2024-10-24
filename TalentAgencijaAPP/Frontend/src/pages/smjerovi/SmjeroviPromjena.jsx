import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";
import SmjerService from "../../services/SmjerService";
import { useEffect, useState } from "react";



export default function SmjeroviPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [smjer,setSmjer] = useState({});

    async function dohvatiSmjer(){
        const odgovor = await SmjerService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        odgovor.poruka.izvodiSeOd = moment.utc(odgovor.poruka.izvodiSeOd).format('yyyy-MM-DD');
        setSmjer(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiSmjer();
    });

    async function promjena(smjer){
        //console.log(smjer);
        //console.log(JSON.stringify(smjer));
        const odgovor = await SmjerService.promjena(routeParams.sifra,smjer);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.SMJER_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get('naziv'), // 'naziv' je došao iz atributa name od Form.Control
            trajanje: parseInt(podaci.get('trajanje')),
            izvodiSeOd: moment.utc(podaci.get('izvodiSeOd')),
            vaucer: podaci.get('vaucer')=='on' ? true : false
        });

    }

    return(
        <Container>
            Promjena smjera
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={smjer.naziv} />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="number" name="trajanje" min={0} max={500} 
                    defaultValue={smjer.trajanje}/>
                </Form.Group>

                <Form.Group controlId="izvodiSeOd">
                    <Form.Label>Izvodi se od</Form.Label>
                    <Form.Control type="date" name="izvodiSeOd"  
                    defaultValue={smjer.izvodiSeOd}/>
                </Form.Group>

                <Form.Group controlId="vaucer">
                    <Form.Check label="Vaučer" name="vaucer" 
                    defaultChecked={smjer.vaucer}/>
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
                        Promjeni smjer
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}