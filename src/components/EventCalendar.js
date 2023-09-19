import React from 'react'
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from 'react-router-dom';


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"


export default class EventCalendar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventList: [],
      colecaoDeEventosRef: collection(db, 'eventos'), // Certifique-se de que 'db' esteja definido em algum lugar
    };
  }

   async componentDidMount() {
    try {
      const data = await getDocs(this.state.colecaoDeEventosRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        Title: doc.data().NomeEvento,
        Date: doc.data().DataInicial
      }));
      this.setState({ eventList: filteredData, loading: false });
    } catch (err) {
      this.setState({ loading: false });
    }
  }
  //   const filteredData = data.docs.map((doc) => ({...doc.data(), NomeEvento: doc.NomeEvento}))
  //   this.setState(eventList[filteredData])
  // }

  render() {
    const { eventList, loading } = this.state;

    const events = eventList.map((event) => ({
      title: event.NomeEvento,
      date: event.dataDoEvento, // Certifique-se de que o nome do campo da data seja correto
    }));

    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          customButtons={{
            myCustomButton: {
              text: 'Criar evento esportivo',
              click: function() {
                // Redireciona para a rota "/adicionar-membros" ao clicar no botão
                window.location.href = "/adicionar-evento-esportivo";
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
      </>
    );
  }
}
