import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import SmjeroviPregled from './pages/smjerovi/SmjeroviPregled'
import SmjeroviDodaj from './pages/smjerovi/SmjeroviDodaj'
import SmjeroviPromjena from './pages/smjerovi/SmjeroviPromjena'


function App() {

  
  return (
    <>
      <NavBarEdunova />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.SMJER_PREGLED} element={<SmjeroviPregled />} />
        <Route path={RoutesNames.SMJER_NOVI} element={<SmjeroviDodaj />} />
        <Route path={RoutesNames.SMJER_PROMJENA} element={<SmjeroviPromjena />} />
      </Routes>
    </>
  )
}

export default App
