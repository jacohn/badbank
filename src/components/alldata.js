
import React from 'react';
import {UserContext, Card} from './context';
import '../App.css'

function AllData(){
  const ctx = React.useContext(UserContext);
  console.log(ctx.users.name)
  
  return (
    <Card
      bgcolor="Info"
      txtcolor="black"
      header="AllData"
      title="100% Data Visibility Guaranteed"
      body={
      <div className="overflow-auto">
      <table className="table transparent-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody>
            {ctx.users && ctx.users.map((user, index)=>(
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                </tr>
            ))}
        </tbody>
      </table>
    
      </div>}
    />    
  );  


}


export default AllData