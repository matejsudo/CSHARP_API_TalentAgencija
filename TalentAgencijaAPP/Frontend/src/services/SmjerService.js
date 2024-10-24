import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Agent')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Agent/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Ne postoji agent!'}
    })
}

async function obrisi(sifra) {
    return await HttpService.delete('/Agent/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
       return odgovor;
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: 'Agent se ne može obrisati!'}
    })
}

async function dodaj(smjer) {
    return await HttpService.post('/Agent',smjer)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Agent se ne može dodati!'}
    })
}

async function promjena(sifra,smjer) {
    return await HttpService.put('/Agent/' + sifra,smjer)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Agent se ne može promjeniti!'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}