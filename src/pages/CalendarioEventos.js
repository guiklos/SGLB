import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function CalendarioEventos() {
  const [eventList, setEventList] = useState([]);
  const colecaoDeEventosEsportivosRef = collection(db, "eventosEsportivos");

  useEffect(() => {
    const getEventList = async () => {
      // Ler o BD
      try {
        const data = await getDocs(colecaoDeEventosEsportivosRef);
        const filteredData = data.docs.map((doc) => ({
          title: doc.data().NomeEventoEsportivo,
          date: doc.data().dataEventoEsportivo,
          id: doc.id,
        }));
        setEventList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getEventList();
  }, []);

  return (
    <div className="Eventos">
      <h2>CalendarioEventos</h2>;
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={eventList} // Corrigido para eventList
        customButtons={{
          myCustomButton: {
            text: "Criar evento",
            click: function () {
              // Redireciona para a rota "/adicionar-membros" ao clicar no botão
              window.location.href = "/adicionar-evento";
            },
          },
        }}
        headerToolbar={{
          start: "title",
          center: "myCustomButton",
          end: "today prev,next",
        }}
        eventDisplay="block"
        eventClick={(info) => {
          alert("Event: " + info.event.title);
        }}
      />
      {/* <div>
        {eventList.map((eventos) => (
          <div key={eventos.id}>
            <h1>{eventos.title}</h1>
            <p>Data do evento: {eventos.date}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default CalendarioEventos;
