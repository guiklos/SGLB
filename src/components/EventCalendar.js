import React from 'react'
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' //plugin
import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"


export default class EventCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventList: [],
      colecaoDeEventosEsportivosRef: collection(db, 'eventosEsportivos'),
    };
  }

   async componentDidMount() {
    try {
      const data = await getDocs(this.state.colecaoDeEventosEsportivosRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        Title: doc.data().NomeEventoEsportivo,
        Date: doc.data().dataEventoEsportivo,
        Modalidade: doc.data().Modalidade,
        id: doc.id
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
      title: event.NomeEventoEsportivo,
      date: event.dataEventoEsportivo,
      modalidade: event.Modalidade, 
      id: event.id,
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
           alert("Event: " + info.event.title + "\nSDate: " + info.event.date + "\nModalidade: " + info.event.modalidade);
          // const eventoId = info.event.id;
          // const urlEventoDetalhes = `/evento-detalhes/${eventoId}`;
          // //const urlEventoDetalhes = `/evento-detalhes/${eventoId}`;
          // <Link to={`/evento-detalhes/${eventoId}`}>Ver detalhes do evento</Link>
          // window.location.href = urlEventoDetalhes;
          
  // Redirecione o usuário para a página de detalhes do evento.
  
}}

        />
      </>
    );
  }
}
