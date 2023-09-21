import EventCalendar from "../components/EventCalendar";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const CalendarioEsportivo = () => {

    return(
      <>
<h2>CalendarioEsportivo</h2>;
{/* <div>
      <input placeholder='Nome do evento' />
      <input placeholder='Local do evento' />
      <input placeholder='Descrição do evento'/>
      <input placeholder='Data de Inicio' />
      <input placeholder='Data do final'/>
      <button>Cadastrar evento</button>
    </div> */}
    <div></div>
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