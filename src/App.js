
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CalendarioEsportivo from './pages/CalendarioEsportivo';
import CalendarioEventos from './pages/CalendarioEventos';
import GerenciarMembros from './pages/GerenciarMembros';
import LoginScreen from './pages/LoginScreen';
import AdicionarEvento from './pages/AdicionarEvento'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import AdicionarEventoEsportivo from './pages/AdicionarEventoEsportivo';
import AdicionarMembro from './pages/AdicionarMembro';
import EventoDetalhes from './pages/EventoDetalhes';
import EventCalendar from './components/EventCalendar';


function App() {

  const eventoId = {}

  return (
    <>
     <NavBar />
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/calendario-esportivo" element={<CalendarioEsportivo />} />
          <Route path="/calendario-eventos" element={<CalendarioEventos />} />
          <Route path="/gerenciar-membros" element={<GerenciarMembros />} />
          <Route path="/adicionar-evento" element={<AdicionarEvento />} />
          <Route path="/adicionar-evento-esportivo" element={<AdicionarEventoEsportivo />} />
          <Route path="/adicionar-membro" element={<AdicionarMembro />} />
          <Route exact path="/" component={EventCalendar} />
          <Route path={`/evento-detalhes/${eventoId}`} component={EventoDetalhes} /> 


       </Routes>
    </>
  );
}

export default App;
