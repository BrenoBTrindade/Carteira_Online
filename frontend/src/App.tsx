import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login'
import Main from './pages/main';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <Navigate to="/login" /> } />
    <Route path="/login" element={ <Login /> } />
    <Route path="/register" element={ <Register /> } />
    <Route path="/main" element={ <Main /> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
