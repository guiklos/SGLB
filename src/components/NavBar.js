// Components/NavBar.js
import { Link } from 'react-router-dom';

const NavBar = () => {
 return (
 <nav>
       <ul>
          <li>
             <Link to="/">Home</Link>
          </li>
          <li>
             <Link to="/calendario-esportivo">Calendário Esportivo</Link>
          </li>
          <li>
             <Link to="/calendario-eventos">CalendarioEventos</Link>
          </li>
          <li>
             <Link to="/gerenciar-membros">Gerenciar Membros</Link>
          </li>
       </ul>
 </nav>
 );
};

export default NavBar;