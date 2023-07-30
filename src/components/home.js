// Import necessary React module, Contexts, and Components
import React from 'react';
import { Card} from './context';
import {Link} from 'react-router-dom';
import '../App.css'

// Define the Home component
function Home(){

  return (
    //Create a Card component with title of badbank, greeting, and image.
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="BadBank Landing Module"
      title="BadBank"
      text="Welcome to the baddest bank in town!"
      body={(
        <div>
      <img src="bank.jpeg" className="img-fluid" alt="Responsive image"/>
      <br/>
      <button type="button" className="btn btn-light button-spacing">
        <Link className="nav-link" to="/login/">
            Login
        </Link>
      </button>
      </div>
      )}
    />    
  );  
}

// Export Home component for use in other files
export default Home