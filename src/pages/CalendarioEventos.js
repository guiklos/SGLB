import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; //plugin!

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
