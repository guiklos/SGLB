import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div>
   <nav>
      <ul
      style={{
         listStyle:'none',
         paddingTop:30,
         paddingLeft: 100,
         paddingRight:200,
         display: 'flex',
         flexDirection:'row',
      
         }}>
         
         <div style={{paddingLeft: 20,paddingRight:20 }}> 
         <li style={{backgroundColor: 'grey', padding: 10}}>
            <Link style={{color: 'black'}} to="/calendario-esportivo">Calendário Esportivo</Link>
         </li>
         </div>
         <div style={{paddingLeft: 20,paddingRight:20 }}> 
         <li style={{backgroundColor: 'grey', padding: 10}}>
            <Link style={{color: 'black'}} to="/calendario-eventos">CalendarioEventos</Link>
         </li>
         </div>
         <div style={{paddingLeft: 20,paddingRight:20 }}> 
         <li style={{backgroundColor: 'grey', padding: 10}}>
            <Link style={{color: 'black'}} to="/gerenciar-membros">Gerenciar Membros</Link>
         </li>
         </div>
      </ul>
</nav>
</div>
    )
  };
  
  export default Home;