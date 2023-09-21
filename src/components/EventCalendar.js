import React from 'react'
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
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
        id: doc.id,
        Adversário: doc.data().Adversario,
        Arbitragem: doc.data().Arbitragem,
        Coordenador: doc.data().Coordenador,
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
      adversário: event.Adversario,
      arbitragem: event.Arbitragem,
      coordenador: event.Coordenador,
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
  const event = info.event;
  alert(
    "Event: " + event.title + 
    "\nModalidade: " + event.extendedProps.modalidade + 
    "\nAdversário: " + event.extendedProps.adversário + 
    "\nArbitragem: " + event.extendedProps.arbitragem + 
    "\nCoordenador: " + event.extendedProps.coordenador
  );

          // const eventoId = info.event.id;
          // const urlEventoDetalhes = `/evento-detalhes/${eventoId}`;
          // //const urlEventoDetalhes = `/evento-detalhes/${eventoId}`;
          // <Link to={`/evento-detalhes/${eventoId}`}>Ver detalhes do evento</Link>
          // window.location.href = urlEventoDetalhes;

  
}}

        />
      </>
    );
  }
}
