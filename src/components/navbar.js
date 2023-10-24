// Import necessary components and libraries 
import { NavLink } from 'react-router-dom';
import {Tooltip} from 'react-tooltip';
import {UserContext} from './context';
import React, {useState} from "react";
import {Navbar, Nav} from 'react-bootstrap'

// Define the NavBar component
function NavBar() {
  const ctx=React.useContext(UserContext);
  const [expanded, setExpanded]= useState(false);


  const handleLogout= () => {
      setExpanded(false);
      ctx.setCurrentUser(null);
    }
   

  return (
// Enclose everything in a div
    <div>
      {/* Define the navbar, set its properties */}
      <Navbar bg="light" expand="md" expanded={expanded}>
        <Navbar.Brand>
          <NavLink to="/" onClick={()=> setExpanded(false)} data-tip="Home" activeClassName="active">BadBank</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link><NavLink to="/CreateAccount" onClick={() => setExpanded(false)} activeClassName="active" data-tip="Create a new account">Create Account</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/login" onClick={() => setExpanded(false)} activeClassName="active" data-tip="Log into your account">Login</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/deposit" onClick={() => setExpanded(false)} activeClassName="active" data-tip="Make a deposit">Deposit</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/withdraw" onClick={() => setExpanded(false)} activeClassName="active" data-tip="Make a withdraw">Withdraw</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/balance" onClick={() => setExpanded(false)} activeClassName="active" data-tip="Check your balance">Balance</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/alldata" onClick={() => setExpanded(false)} activeClassName="active" data-tip="See all the data we collected">All Data</NavLink></Nav.Link>
            {ctx.currentUser && (
              <Nav.Link onClick={handleLogout} activeClassName="active">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Tooltip />
      </div>
  );
}

// export NavBar component
export default NavBar;
