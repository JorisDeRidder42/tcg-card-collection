import { Route, Routes } from 'react-router-dom';
import {ProtectedRoute } from './Pages/ProtectedRoute';
import { useAuth } from './Context/authContext';
import Login from './Pages/Login';
import Fault from './pages/fault';
import Home from './Pages/home';


const Routing = () => {
    const { authenticated } = useAuth();
    return (
        // <Routes>
        //     <Route exact path="/" 
        //      element={<ProtectedRoute authenticated={authenticated}>
        //       <Home/>
        //     </ProtectedRoute>
        //   }
        // />
        <Routes>
        <Route path={'/'} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
            {/* <Route path={'/register'} element={<Register/>}/> */}
            <Route path={'*'} element={<Fault/>}/>
        </Routes>
    )
}

export default Routing;