import { Route, Routes} from 'react-router-dom';
import {ProtectedRoute } from './Pages/ProtectedRoute';
import { useAuth } from './Context/authContext';
import Fault from './pages/fault';
import Home from './Pages/home';
import Login from './Pages/Login';  
import SavedCardsPage from './pages/SavedCardsPage';

const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" 
             element={<ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        {/* <Route path={'/'} element={<Home/>}/> */}
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/saved'} element={<SavedCardsPage/>}/>
          {/* <Route path={'/register'} element={<Register/>}/> */}
            <Route path={'*'} element={<Fault/>}/>
        </Routes>
    )
}

export default Routing;