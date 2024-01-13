
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

//layouts
import Container from './components/layout/Container';

//pages
import Home from './components/pages/Home';
import PatientsRegister from './components/pages/PatientsRegister';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
            <Route path = "/" element={<Home/>} />
            <Route path = "/patients/register" element={<PatientsRegister />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
