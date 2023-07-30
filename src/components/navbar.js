// Import necessary components and libraries 
import { NavLink } from 'react-router-dom';
import {Tooltip} from 'react-tooltip';

// Define the NavBar component
function NavBar() {
  return (
// Enclose everything in a div
    <div>
      {/* Define the navbar, set its properties */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        {/* NavLink for the home page */}
        <NavLink className="navbar-brand" to="/" data-tip="Home" activeClassName="active">
          BadBank
        </NavLink>
        {/* Button to toggle the navbar on smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       {/* The collapsible part of the navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Unordered list for the nav items */}
          <ul className="navbar-nav">
            {/* Nav item for creating a new account */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/CreateAccount/" activeClassName="active" data-tip="Create a new account">
                Create Account
              </NavLink>
            </li>
            {/* Nav item for logging in */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/" activeClassName="active" data-tip="Log into your account">
                Login
              </NavLink>
            </li>
            {/* Nav item for making a deposit */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/deposit/" activeClassName="active" data-tip="Make a deposit">
                Deposit
              </NavLink>
            </li>
            {/* Nav item for making a withdrawl */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/withdraw/" activeClassName="active" data-tip="Make a withdraw">
                Withdraw
              </NavLink>
            </li>

            {/* Nav item for checking your balance */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/balance/" activeClassName="active" data-tip="Check your balance">
                Balance
              </NavLink>
            </li>

            {/* Nav item for seeing all data */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/alldata/" activeClassName="active" data-tip="See all the data we collected">
                All Data
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/* include ReactTooltip component */}
      <Tooltip />
    </div>
  );
}

// export NavBar component
export default NavBar;
