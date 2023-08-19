import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import Happier from './routes/Happier/Happier';
import Login from './routes/Login/Login';
import Signup from './routes/Signup/Signup';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './routes/Profile/Profile';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Happier'
          element={
            <ProtectedRoute>
              <Happier />
            </ProtectedRoute>
          }>
        </Route>
        <Route path='/Happier/login' element={<Login />}></Route>
        <Route path='/Happier/signup' element={<Signup />}></Route>
        <Route path='/Happier/:username' element={<Profile />}></Route>

      </Routes>
    </>
  );
}

export default App;
