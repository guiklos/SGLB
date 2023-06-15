import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import React, { useEffect, useState} from 'react';
import { db } from './config/firebase'
import { getDocs, collection, addDoc } from 'firebase/firestore'

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
    <div className='App'> 
    <Auth />
    <div>
      <input placeholder='Nome do membro' onChange={(e) => setMemberName(e.target.value)}/>
      <input placeholder='Modalidade' onChange={(e) => setMemberModality(e.target.value)}/>
      <input placeholder='RG' type='Number' onChange={(e) => setMemberRG(Number(e.target.value))}/>
      <input placeholder='Sexo' onChange={(e) => setMemberSex(e.target.value)}/>
      <input placeholder='Contato' onChange={(e) => setMemberContact(e.target.value)}/>
      <button onClick={onSumbitMember}>Cadastrar membro</button>
    </div>
    <div>
      {memberList.map((membro) => (
        <div>
          <h1>{membro.Nome}</h1>
          <p>Modalidade: {membro.Modalidade}</p>
          <p>RG: {membro.RG}</p>
          <p>Sexo: {membro.Sexo}</p>
          <p>Contato: {membro.Contato}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
