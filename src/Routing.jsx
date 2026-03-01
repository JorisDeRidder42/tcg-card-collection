import { Route, Routes} from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Fault from './pages/fault';
import Home from './pages/Home';
import Login from './Pages/Login';  
import Camera from './components/Camera';
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
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/saved'} element={<SavedCardsPage/>}/>
            <Route path={'/camera'} element={<Camera/>}/>
            <Route path={'*'} element={<Fault/>}/>
        </Routes>
    )
}

export default Routing;