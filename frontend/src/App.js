
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

function App() {
  return (
    <BrowserRouter>
    <Message />
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
