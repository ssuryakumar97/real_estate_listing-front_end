import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import PropertiesPage from './pages/PropertiesPage';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterProperty from './pages/RegisterProperty';
import UpdateProperty from './pages/UpdateProperty';
import { useSelector } from 'react-redux';

const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ? (
    <>
    <Outlet/>
    </> ) : <Navigate to="/login"/>
  
}

function App() {
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated)
  console.log(isUserAuthenticated)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<PrivateRoute isAuthenticated={isUserAuthenticated} />} >
            <Route path="/yourProperties" element={<PropertiesPage/>}/>
            <Route path="/registerProperty" element={<RegisterProperty/>}/>
            <Route path="/updateProperty/:id" element={<UpdateProperty/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
