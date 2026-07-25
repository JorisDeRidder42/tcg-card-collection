import { Route, Routes} from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Fault from './pages/fault';
import Home from './pages/Home';
import Login from './Pages/Login';  
import SavedCardsPage from './pages/SavedCardsPage';
import CardDetail from './components/Card/CardDetail';
import SetDetail from './pages/setDetail';

const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" 
             element={<ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
            <Route path={'/card/:id'} element={<CardDetail/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/saved'} element={<SavedCardsPage/>}/>
            <Route path={'/sets/:setId'} element={<SetDetail/>}/>
            <Route path={'*'} element={<Fault/>}/>
        </Routes>
    )
}

export default Routing;