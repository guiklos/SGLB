import React from 'react'
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"


export default class EventCalendar extends React.Component {

  render() {

    // const [eventList, setEventList] = useState ([]);
    // const colecaoDeMembrosRef = collection(db, "membro")

    // useEffect(() => {
    //   const getEventList = async () => {
    //     //Ler o BD
    //     try{
    //       const data = await getDocs(colecaoDeMembrosRef)
    //       const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    //       setEventList(filteredData)
    //     } catch (err) {
    //       console.error(err)
    //     }
        
    //   };
    //   getEventList();
    // }, [])
  
    
    let events = 
      [
        {
          title: 'Evento 1',
          date: '2023-09-13',
      
        },
        {
          title: 'Evento 2',
          date: '2023-09-14',
      
        }
        // other events here
      ];

    return (
      <>  
      <FullCalendar  
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        customButtons={{
          myCustomButton: {
            text: 'Criar evento esportivo',
            click: function() {
            alert('clicked the custom button!');
      }
    }
        }}
        headerToolbar = {{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center:'myCustomButton',
          end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
        }}
        
        
        // eventDidMount={(info) => {
        //   return new bootstrap.Popover(info.el, {
        //     title: info.event.title,
        //     placement: "auto",
        //     trigger: "hover",
        //     customClass: "popoverStyle",
        //     content:
        //       "<p>Please subscribe<strong>Bootstrap popover</strong>.</p>",
        //     html: true,
        //   });
        // }}
        eventDisplay='block'
        eventClick= {(info) => {
          alert('Event: ' + info.event.title);
          //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
          //alert('View: ' + info.view.type);
        }}
/>
</>
    )
  }
}