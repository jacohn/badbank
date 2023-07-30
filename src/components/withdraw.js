// Import necessary React module, hooks, Contexts, and Components
import React, { useState } from "react";
import { UserContext, Card } from "./context";
import '../App.css'

// Define the Withdraw component
function Withdraw() {
  // Set Context
  const ctx = React.useContext(UserContext);
  // Set State
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");

// Function to validate withdrawl input is less than the balance, above zero, and a number.
  function validate(input) {
    if (isNaN(input)) {
      
      setStatus("Error: Your deposit must be a number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (input <= 0.0 || input > ctx.currentUser.balance) {
      
      setStatus(
        "Error: Your withdraw must be greater than $0.00 but no greater than your balance of $" +
          ctx.currentUser.balance + "."
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    
    setStatus("Success!")
    return true;
  }

  // function called when withdraw button is clicked
  function handleWithdraw(e) {
    e.preventDefault();
    if (!validate(parseFloat(withdraw))) return;
    let newBalance = ctx.currentUser.balance - parseFloat(withdraw);

    const userIndex = ctx.users.findIndex(
      (user) => user.email === ctx.currentUser.email
    );
   
  let newUsers=[...ctx.users];
      newUsers[userIndex]={
        ...newUsers[userIndex],
        balance: newBalance};

        ctx.updateUser({
            ...ctx.currentUser, balance: newBalance
        });
        ctx.setCurrentUser(newUsers[userIndex]);
        setWithdraw(0.00);
      }

// Render the component
  return (
    <Card
      bgcolor="warning"
      header="Withdraw"
      body={<form onSubmit={handleWithdraw}>
        <div>
          <text>Current User: {ctx.currentUser.name}</text>
          <br />  
          <text>Balance: ${ctx.currentUser ? ctx.currentUser.balance : '0'}</text>
          <br />
          <input
            type="number"
            className="form-control"
            id="withdraw"
            placeholder="Withdraw Amount"
            value={withdraw}
            onChange={(e) => setWithdraw(e.currentTarget.value)}
          />
        </div>
        <br />
        {status && <div className="alert alert-success">{status}</div>}
        <button
          type="submit"
          className="btn btn-light"
          disabled={withdraw=== "" || isNaN(withdraw) || parseFloat(withdraw) <=0}
        >
          Withdraw
        </button>
      </form>
  }
    />
  );
}

// Export Withdraw compoent for use in App.js
export default Withdraw
