import React, { Component } from 'react';
import NavItems from '../Navitems/Navitems'
import {NavLink} from 'react-router-dom'
const navbar = (props) => {
  console.log(props.isRecruiter + 'This is nav');
  let items;
  
  if (!props.isAuth) {
    items = (
       <ul className="navbar-nav ml-auto">

      
      <NavItems
          topic="Login"
          
        link="/login"
      />

      <NavItems
          topic="Register"
        link="/Signup"
        />
        </ul>

    );
  }
    
  if (props.isAuth && props.isRecruiter) {
    items = (<ul className="navbar-nav ml-auto">
      <NavItems
        topic="Jobs Posted"
        
        link="/recruiter/posted"
      />
      
      <NavItems
        topic={props.name}
      
        link="/"
      />

      
    </ul>)
  }
  if (props.isAuth && !props.isRecruiter) {
     items = (<ul className="navbar-nav ml-auto">
      <NavItems
        topic="Jobs Applied"
        
        link="/applicant/applied"
      />
      
      <NavItems
        topic={props.name}
      
        link="/"
      />
      
    </ul>)
     
   }
    let logout;
    if (props.isAuth) {
      logout = (
        
        <li className="nav-item ">
          <NavLink className = "nav-link" to="/" onClick = {props.logout}>Logout </NavLink>
          </li>  
             );
    }
  

    return (<nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#563d7c"}}>
      <a class="navbar-brand" href="/">Jobs.com</a>
     <ul className="navbar-nav ml-auto">
      {items}
        {logout}
        </ul>
</nav>
    );
    
}

export default navbar;
