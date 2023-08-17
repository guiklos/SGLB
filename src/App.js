import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import React, { useEffect, useState} from 'react';
import { db } from './config/firebase'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { Routes, Route } from 'react-router-dom';
import CalendarioEsportivo from './pages/CalendarioEsportivo';
import CalendarioEventos from './pages/CalendarioEventos';
import GerenciarMembros from './pages/GerenciarMembros';
import Home from './pages/Home';
import NavBar from './components/NavBar';

function App() {

  const [memberList, setMemberList] = useState ([]);
  const colecaoDeMembrosRef = collection(db, "membro")

  //Data do novo usuario
  const [memberName, setMemberName] = useState('')
  const [memberModality, setMemberModality] = useState('')
  const [memberRG, setMemberRG] = useState(0)
  const [memberSex, setMemberSex] = useState('')
  const [memberContact, setMemberContact] = useState('')

  useEffect(() => {
    const getMemberList = async () => {
      //Ler o BD
      try{
        const data = await getDocs(colecaoDeMembrosRef)
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setMemberList(filteredData)
      } catch (err) {
        console.error(err)
      }
      
    };
    getMemberList();
  }, [])

  const onSumbitMember = async () => {
    try{
    await addDoc(colecaoDeMembrosRef, {Nome: memberName, Modalidade: memberModality, RG: memberRG, Sexo: memberSex, Contato: memberContact})
    } catch(err){
      console.error(err)
    }
  }
  
  return (
    <>
     <NavBar />
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendario-esportivo" element={<CalendarioEsportivo />} />
          <Route path="/calendario-eventos" element={<CalendarioEventos />} />
          <Route path="/gerenciar-membros" element={<GerenciarMembros />} />
       </Routes>
    </>
  );
}

export default App;
