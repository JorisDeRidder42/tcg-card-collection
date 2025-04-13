import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './Context/authContext';
import Routing from '../src/Routing';

function App() {
  return (
    <Container>
      <h1 className="text-2xl text-center mt-5 font-bold">Pokémon Card Browser</h1>
      <Routing/>
    </Container>
    
  );
}

export default App;
