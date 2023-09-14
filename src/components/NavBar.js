// Components/NavBar.js
import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../src/Images/Logo Los Bravos 1.png'

const NavBar = () => {
 return (
   <>
   <div style={{
      backgroundColor: 'red',
      display: 'flex',
      flexDirection:'row',
      
       justifyContent: "space-between",
   }}>
      
   {/* Logo */}
   <div >
      <img style={{
         height: 100,
         width: 100,
         }} 
      src= {logo} alt= 'logo'/>
   </div>

   {/* NavBar */}
   <div>
   <nav>
      <ul
      style={{
         listStyle:'none',
         paddingLeft: 100,
         paddingRight:200,
         display: 'flex',
         flexDirection:'row',
      
         }}>
         <div style={{paddingLeft: 20,paddingRight:20 }}> 
         <li style={{backgroundColor: 'grey', padding: 10}}>
            <Link style={{color: 'black'}} to="/">Home</Link>
         </li>
         </div>
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
         <div style={{paddingLeft: 20,paddingRight:20 }}> 
         <li style={{backgroundColor: 'grey', padding: 10}}>
            <Link style={{color: 'black'}} to="/login-screen">LoginScreen</Link>
         </li>
         </div>
      </ul>
</nav>
</div>
 </div>
 </>
 );
};

export default NavBar;