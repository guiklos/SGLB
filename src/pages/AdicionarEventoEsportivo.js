import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function AdicionarEventoEsportivo() {
  // const [eventList, setEventList] = useState ([]);
  const colecaoDeEventosEsportivosRef = collection(db, "eventosEsportivos")

  //Data do novo usuario
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')

  const onSumbitEvent = async () => {
    try{
    await addDoc(colecaoDeEventosEsportivosRef, {NomeEvento: eventName, dataDoEvento: eventDate})
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div className='Membros'> 
    <div><h1>ADICIONAR EVENTO ESPORTIVO</h1></div>
    <div>
      
      <input placeholder='Nome do evento' onChange={(e) => setEventName(e.target.value)}/>
      <input placeholder='Data de início' onChange={(e) => setEventDate(e.target.value)}/>
      
      <button onClick={onSumbitEvent}>Cadastrar evento</button>
    </div>
    </div>
  );

}

export default AdicionarEventoEsportivo;