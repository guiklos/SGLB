import React from "react";
import { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function CalendarioEventos() {

  const [eventList, setEventList] = useState ([]);
  const colecaoDeEventosRef = collection(db, "eventos")

  //Data do novo usuario
  const [eventName, setEventName] = useState('')
  const [eventPlace, setEventPlace] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endingDate, setEndingDate] = useState('')

  useEffect(() => {
    const getEventList = async () => {
      //Ler o BD
      try{
        const data = await getDocs(colecaoDeEventosRef)
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setEventList(filteredData)
      } catch (err) {
        console.error(err)
      }
      
    };
    getEventList();
  }, [])

  const onSumbitEvent = async () => {
    try{
    await addDoc(colecaoDeEventosRef, {NomeEvento: eventName, Local: eventPlace, Descrição: description, DataInicial: startDate, DataFinal: endingDate})
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div className='Eventos'> 
    <Auth />
    <div>
      <input placeholder='Nome do evento' onChange={(e) => setEventName(e.target.value)}/>
      <input placeholder='Local do evento' onChange={(e) => setEventPlace(e.target.value)}/>
      <input placeholder='Descrição do evento' onChange={(e) => setDescription(e.target.value)}/>
      <input placeholder='Data de Inicio' onChange={(e) => setStartDate(e.target.value)}/>
      <input placeholder='Data do final' onChange={(e) => setEndingDate(e.target.value)}/>
      <button onClick={onSumbitEvent}>Cadastrar evento</button>
    </div>
    <div>
      {eventList.map((eventos) => (
        <div>
          <h1>{eventos.NomeEvento}</h1>
          <p>Local do evento: {eventos.Local}</p>
          <p>Descrição do evento: {eventos.Descrição}</p>
          {/* <p>Data Inicial: {eventos.DataInicial}</p>
          <p>Data Final: {eventos.DataFinal}</p> */}
        </div>
      ))}
    </div>
    </div>
  );

}

export default CalendarioEventos;