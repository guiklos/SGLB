
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CalendarioEsportivo from './pages/CalendarioEsportivo';
import CalendarioEventos from './pages/CalendarioEventos';
import GerenciarMembros from './pages/GerenciarMembros';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
     <NavBar />
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/calendario-esportivo" element={<CalendarioEsportivo />} />
          <Route path="/calendario-eventos" element={<CalendarioEventos />} />
          <Route path="/gerenciar-membros" element={<GerenciarMembros />} />
       </Routes>
    </>
  );
}

export default App;
