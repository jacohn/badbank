// Import necessary modules, hooks, contexts, and components
import React, { useState } from "react";
import { UserContext, Card } from "./context";
import { Link } from "react-router-dom";
import '../App.css'
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCIPQ7mYVu5AgsvZKBuSUxvmwwvX0qa0pA",
  authDomain: "courso-19d5c.firebaseapp.com",
  databaseURL: "https://courso-19d5c-default-rtdb.firebaseio.com",
  projectId: "courso-19d5c",
  storageBucket: "courso-19d5c.appspot.com",
  messagingSenderId: "1034126783799",
  appId: "1:1034126783799:web:00b83ec948e61007e096b2",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);



// define login component. 
function Login() {
  // Define and initialize state variables
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  // get current context
  const ctx = React.useContext(UserContext);


  // called when submit button is pushed
  async function handleLogin(e) {
    e.preventDefault();

    try{
      //authenticate using Firebase
      const userCredential= await firebase.auth()
        .signInWithEmailAndPassword(checkEmail, checkPassword);
      const user= userCredential.user;

      // Get the ID token from Firebase
      const idToken = await user.getIdToken();

      // Send the ID token to your backend
      const response= await fetch('/account/login',{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ idToken
          },
          body: JSON.stringify({email: checkEmail, password: checkPassword})
        });

        const data= await response.json();
        console.log(data);

        if (data.authenticated){
          ctx.setCurrentUser(data.user);
          setShow(false);
        } else{
          setStatus('Error: '+ data.message);
          setTimeout(()=> setStatus(''), 3000);
        }
      } catch(error){
        if (error.code && error.code.startsWith('auth/')){
          //firebase authentication error
          setStatus('Firebase Error: '+ error.message);
        } else{
          //server or network error
          setStatus('Server or Network Error: '+ error.message);
        }
        setTimeout(()=> setStatus(''), 3000);
      }
    }



  // component return
  return (
    show ? (

        <Card
              bgcolor="primary"
              header="Login"
              status={status}
              body= {
              <form onSubmit={handleLogin}>
                  <div>
                    <label>Email address</label>
                    <br/>
                    <input
                      type="input"
                      className="form-control"
                      id="emailCheck"
                      placeholder="Email"
                      value={checkEmail}
                      onChange={(e) => setCheckEmail(e.currentTarget.value)}
                    />
                    <br />
                    <label>Password</label>
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      id="passwordCheck"
                      placeholder="Password"
                      value={checkPassword}
                      onChange={(e) => setCheckPassword(e.currentTarget.value)}
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-light button-spacing"
                      disabled={ !checkEmail || !checkPassword}
                    >
                      Login
                    </button>
                    <button type="button" className="btn btn-light button-spacing">
                    <Link className="nav-link" to="/createaccount/">
                        Create Account
                    </Link>
                  </button>
                  </div>
                  </form>
              }
                />
                ) : (
                  <Card
              bgcolor="primary"
              header={`Welcome, ${ctx.currentUser.name}`}
              status={status}
                  body={
                    <>
                    <div>Balance: ${ctx.currentUser ? ctx.currentUser.balance : '0'}
                    </div>
                    <button type="button" className="btn btn-light button-spacing">
                      {" "}
                      <Link className="nav-link" to="/deposit/">
                        Deposit
                      </Link>
                    </button>
                    <button type="button" className="btn btn-light button-spacing">
                      {" "}
                      <Link className="nav-link" to="/withdraw/">
                        Withdraw
                      </Link>
                    </button>
                    
                  </>
                  }
                  />
                )
              
          
          );
                }




export default Login
