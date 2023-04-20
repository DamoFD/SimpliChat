import React, { useContext } from 'react';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';
import { AuthContext } from './context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
