import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; //plugin

function CalendarioEventos() {
  const [eventList, setEventList] = useState([]);
  const colecaoDeEventosRef = collection(db, "eventos");

  useEffect(() => {
    const getEventList = async () => {
      // Ler o BD
      try {
        const data = await getDocs(colecaoDeEventosRef);
        const filteredData = data.docs.map((doc) => ({
          title: doc.data().NomeEvento,
          date: doc.data().dataDoEvento,
          id: doc.id,
          local: doc.data().Local,
          horario: doc.data().Horário,
          descricao: doc.data().Descrição,
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
      <h2>CalendarioEventos</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={eventList}
        customButtons={{
          myCustomButton: {
            text: "Criar evento",
            click: function () {
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
          alert(
            "Event: " + info.event.title +
            "\nLocal: " + info.event.extendedProps.local +
            "\nHorário: " + info.event.extendedProps.horario +
            "\nDescrição: " + info.event.extendedProps.descricao
          );
        }}
      />
      <div>
        {eventList.map((event) => (
          <div key={event.id}>
            <h1>{event.title}</h1>
            <p>Data do evento: {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarioEventos;
