
import React, {useState, useEffect} from 'react';
import { Card} from './context';
import '../App.css'

function AllData(){
  const [usersData, setUsersData]=useState([]);
  const[loading, setLoading]
=useState(true);

useEffect(()=>{
  fetch('account/alldata')
  .then(response => response.json())
  .then(data => {
    setUsersData(data);
    setLoading(false);
  })
  .catch(error=> {
    console.error("There was an error fetching the data:", error);
    setLoading(false);
  });
},[]);

if(loading){
  return <div>Loading...</div>;
}
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
          {usersData.map((user, index)=>(
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      }
    />    
  );  


}


export default AllData