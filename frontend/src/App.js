
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

//layouts
import Container from './components/layout/Container';
import Message from './components/layout/Message';

//pages
import Home from './components/pages/Home';
import PatientsRegister from './components/pages/PatientsRegister';
import NavBar from './components/layout/NavBar';
import ShowPatients from './components/pages/ShowPatients';
import MakeAppointment from './components/pages/MakeAppointment';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Message />
      <Container>
        <Routes>
            <Route path = "/" element={<Home/>} />
            <Route path = "/patients/register" element={<PatientsRegister />} />
            <Route path = "/showPatients" element={<ShowPatients />} />
            <Route path = "/make/appointment/:id" element={<MakeAppointment />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
