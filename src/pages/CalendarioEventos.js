import React, { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function CalendarioEventos() {
  const [eventList, setEventList] = useState([]);
  const colecaoDeEventosRef = collection(db, "eventos");

  // Data do novo evento
  const [eventName, setEventName] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endingDate, setEndingDate] = useState('');

  useEffect(() => {
    const getEventList = async () => {
      // Ler o BD
      try {
        const data = await getDocs(colecaoDeEventosRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEventList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getEventList();
  }, []);

  const onSubmitEvent = async () => {
    try {
      await addDoc(colecaoDeEventosRef, { NomeEvento: eventName, Local: eventPlace, Descricao: description, DataInicial: startDate, DataFinal: endingDate });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='Eventos'> 
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={eventList} // Corrigido para eventList
        customButtons={{
          myCustomButton: {
            text: 'Criar evento',
            click: function() {
              // Redireciona para a rota "/adicionar-membros" ao clicar no botão
              window.location.href = "/adicionar-evento";
            }
          },
        }}
        headerToolbar={{
          start: 'title',
          center: 'myCustomButton',
          end: 'today prev,next',
        }}
        eventDisplay="block"
        eventClick={(info) => {
          alert('Event: ' + info.event.title);
        }}
      />
      <Auth />
      <div>
        <input placeholder='Nome do evento' onChange={(e) => setEventName(e.target.value)}/>
        <input placeholder='Local do evento' onChange={(e) => setEventPlace(e.target.value)}/>
        <input placeholder='Descrição do evento' onChange={(e) => setDescription(e.target.value)}/>
        <input placeholder='Data de Inicio' onChange={(e) => setStartDate(e.target.value)}/>
        <input placeholder='Data do final' onChange={(e) => setEndingDate(e.target.value)}/>
        <button onClick={onSubmitEvent}>Cadastrar evento</button>
      </div>
      <div>
        {eventList.map((eventos) => (
          <div key={eventos.id}>
            <h1>{eventos.NomeEvento}</h1>
            <p>Local do evento: {eventos.Local}</p>
            <p>Descrição do evento: {eventos.Descricao}</p>
            {/* <p>Data Inicial: {eventos.DataInicial}</p>
            <p>Data Final: {eventos.DataFinal}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarioEventos;
