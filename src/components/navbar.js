import React from 'react'
import { NavLink } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className="nav-wrapper blue">
        <NavLink to="/" className="center brand-logo">Speak Out</NavLink>
        <ul className="right">
          <li><NavLink to="/" >Home</NavLink></li>
          <li><NavLink to="/About" >About</NavLink></li>
          
        </ul>
      </nav>
    </div>
  )
}
