import EventCalendar from "../components/EventCalendar";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const CalendarioEsportivo = () => {

    return(
      <>
<h1>CalendarioEsportivo</h1>;
<EventCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={false}

/>
</>
    ) 
   
  };
  
  export default CalendarioEsportivo;