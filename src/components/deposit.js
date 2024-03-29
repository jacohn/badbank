// import necessary React module, contexts, components, and hooks
import React, {useState} from 'react';
import {UserContext, Card} from './context';
import '../App.css'


// Define the Deposit component
function Deposit(){
  // Use Context
    const ctx=React.useContext(UserContext);
    // Set State
    const [deposit, setDeposit] = useState(0.00);
    const [status, setStatus] = useState('');

    // function to validate deposit input is a positive number
    function validate(input){
      setStatus(''); // Resetting the status message
        if(isNaN(input)){
            setStatus('Error: Your deposit must be a number'); 
              setTimeout(() => setStatus(''),3000);
              return false;
            }

      if(input <= 0.00){
        setStatus('Error: Your deposit must be greater than $0.00'); 
        setTimeout(() => setStatus(''),3000);
        return false;
      }

      setStatus('Well done!')
      return true;
  }
  
  
  // function to handle deposit button
    async function handleDeposit(e){
      e.preventDefault();
      if(!validate(deposit)) return;

      let newBalance= ctx.currentUser.balance + parseFloat(deposit);
      const userIndex = ctx.users.findIndex(user=> user.email=== ctx.currentUser.email);
      let newUsers=[...ctx.users];
      newUsers[userIndex]={
        ...newUsers[userIndex],
        balance: newBalance};

        const url='/account/deposit';
        try {
          const response = await fetch(url,{
            method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ctx.currentUser.token}`  // Assuming token is stored in the user context
        },
        body: JSON.stringify({  
          email: ctx.currentUser.email, 
          deposit: deposit
        }),
      });
      
      if(response.status===401){
        // handle unauthorized response, redirect to login
        setStatus('Unauthorized. Please login again')
      }  

      const data= await response.json();
      console.olog(data);

        ctx.updateUser({
            ...ctx.currentUser, balance: newBalance
        });
        ctx.setCurrentUser(newUsers[userIndex]);
        setDeposit(0.00);
      } catch(error) {
        console.error("There was an error creating the account", error);
      }
    }
      
  // Render the component
    return (
      <Card 
      bgcolor="primary"
      header= "Deposit"
      body=
      <form onSubmit={handleDeposit}>
      <div>
      <div>Current User: {ctx.currentUser.name}</div>
          <br />  
        <div>Balance: ${ctx.currentUser ? ctx.currentUser.balance : '0'}</div>
          </div>
        <div>
        <div>Deposit Amount</div>
        <input type="input" className="form-control" id="deposit" placeholder="Deposit amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
        </div>
        
          <button type="submit" className="btn btn-light" disabled={!deposit}>Deposit</button>
          </form>
        /> 
    )
  }
  
  // Export Deposit compoent for use in App.js
  export default Deposit