import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './Context/authContext';
import Home from './Pages/home';
import Login from './Pages/Login';
import { Route, Router } from 'react-router-dom';
import Routing from '../Routing';

function App() {
  const {authenticaded} = useAuth();
  
  return (
    <Container>
      <h1 className="text-2xl text-center mt-5 font-bold">Pokémon Card Browser</h1>
      <Routing/>
    </Container>
    
  );
}

export default App;
