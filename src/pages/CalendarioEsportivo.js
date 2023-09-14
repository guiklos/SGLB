import EventCalendar from "../components/EventCalendar";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const CalendarioEsportivo = () => {

    return(
      <>
<h2>CalendarioEsportivo</h2>;
<div style={{margin: 20}}>
<EventCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={false}
/>
</div>
</>
    ) 
   
  };
  
  export default CalendarioEsportivo;