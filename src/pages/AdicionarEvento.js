import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function AdicionarEvento() {
  // const [eventList, setEventList] = useState ([]);
  const colecaoDeEventosRef = collection(db, "eventos")

  //Data do novo usuario
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')

  const onSumbitEvent = async () => {
    try{
    await addDoc(colecaoDeEventosRef, {NomeEvento: eventName, dataDoEvento: eventDate})
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div className='Membros'> 
    <div><h1>ADICIONAR EVENTO</h1></div>
    <div>
      
      <input placeholder='Nome do evento' onChange={(e) => setEventName(e.target.value)}/>
      <input placeholder='Data de início' onChange={(e) => setEventDate(e.target.value)}/>
      
      <button onClick={onSumbitEvent}>Cadastrar evento</button>
    </div>
    </div>
  );

}

export default AdicionarEvento;