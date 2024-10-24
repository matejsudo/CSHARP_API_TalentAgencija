import { Button, Container, Table } from "react-bootstrap";
import SmjerService from "../../services/SmjerService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { RoutesNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";



export default function SmjeroviPregled(){

    const[smjerovi,setSmjerovi] = useState();

    const navigate = useNavigate();

    async function dohvatiSmjerove() {

        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await SmjerService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setSmjerovi(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    useEffect(()=>{
        dohvatiSmjerove();
    },[]);

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.');
    }

    function vaucer(v){
        if(v==null) return 'gray';
        if(v) return 'green';
        return 'red'
    }

    async function obrisiAsync(sifra) {
        const odgovor = await SmjerService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiSmjerove();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.SMJER_NOVI}>Dodaj novi smjer</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Izvodi se od</th>
                        <th>Vaučer</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {smjerovi && smjerovi.map((smjer,index)=>(
                        <tr key={index}>
                            <td>{smjer.naziv}</td>
                            <td className={smjer.trajanje==null ? 'sredina' : 'desno'}>
                                {smjer.trajanje==null ? 'Nije definirano' : smjer.trajanje}
                                
                                </td>
                           
                            <td className={'sredina'}>
                                {formatirajDatum(smjer.izvodiSeOd)}
                            </td>
                            <td className={'sredina'}>
                                <GrValidate 
                                size={30}
                                color={vaucer(smjer.vaucer)}
                                />
                            </td>
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/smjerovi/${smjer.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(smjer.sifra)}>
                                    Obriši
                                </Button>

                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}