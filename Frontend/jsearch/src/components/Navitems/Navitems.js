import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const navItems = props => {
    return (
      
        <li className="nav-item ">
          <NavLink className = "nav-link" to={props.link}>{props.topic} </NavLink>
              </li>      
    
    );
}

export default navItems;