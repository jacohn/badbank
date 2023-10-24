import React, {useState, useEffect} from 'react';
import {UserContext, Card} from './context';
import { Link } from "react-router-dom";
import '../App.css'

function Balance(){
const ctx=React.useContext(UserContext);
const [balance, setBalance]= useState(null);
const [status, setStatus] = useState('');

useEffect(()=>{
  if(ctx.currentUser && ctx.currentUser.email) {
    fetchBalance(ctx.currentUser.email);
  }
}, [ctx.currentUser]);

const fetchBalance = (email)=> {
  fetch(`/account/balance/${email}`)
    .then(response => {
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if(data && data.balance){
        setBalance(data.balance);
      } else {
        throw new Error("Data format is not as expected");
      }
    })
    .catch(error => {
      setStatus("Error fetching balance: "+ error.message);
    });
  }

    return (ctx.currentUser && ctx.currentUser.email) ? (

    <Card 
    bgcolor="secondary"
    header= "Balance"
    body={
      <div> 
      <div>Balance: ${balance}</div>
      {status && <div className="alert alert-danger">{status}</div>} 
      <button type="button" className="btn btn-light button-spacing"> 
      <Link className="nav-link" to="/deposit/">Deposit</Link>
      </button>
      <button type="button" className="btn btn-light button-spacing"> <Link className="nav-link" to="/withdraw/">Withdraw</Link>
      </button>
        </div>
        }
      /> 
  ):(
    <div>
    <div>Please log in to check your balance</div>
    <button type="button" className="btn btn-light button-spacing"> <Link className="nav-link" to="/login/">Login</Link>
      </button>
      </div>
  )
}
