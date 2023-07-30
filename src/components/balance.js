import React from 'react';
import {UserContext, Card} from './context';
import { Link } from "react-router-dom";
import '../App.css'


function Balance(){
const ctx=React.useContext(UserContext);

return (
    
    <Card 
    bgcolor="secondary"
    header= "Balance"
    body={
        <> 
    <div>
      <text>Balance: ${ctx.currentUser ? ctx.currentUser.balance : '0'}</text>
        </div>
        
        <button type="deposit" className="btn btn-light button-spacing"> <Link className="nav-link" to="/deposit/">
        Deposit
      </Link></button>
      <button type="withdraw" className="btn btn-light button-spacing"> <Link className="nav-link" to="/withdraw/">
        Withdraw
      </Link></button>
        
        </>}
      /> 
  )
}

export default Balance