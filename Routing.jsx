import { Route, Routes } from 'react-router-dom';
import {ProtectedRoute } from './src/Pages/ProtectedRoute';
import { useAuth } from './src/Context/authContext';
import Home from './src/Pages/home';
import Login from './src/Pages/Login';


const Routing = () => {
    const { authenticated } = useAuth();
    return (
        <Routes>
            <Route exact path="/" 
             element={<ProtectedRoute authenticated={authenticated}>
              <Home/>
            </ProtectedRoute>
          }
        />
            <Route path={'/login'} element={<Login/>}/>
            {/* <Route path={'/register'} element={<Register/>}/> */}




            <Route path={'*'} element={<></>}/>
        </Routes>
    )
}

export default Routing;