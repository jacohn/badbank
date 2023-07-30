// Import necessary libraries and components
import React, { useState } from "react";
import { HashRouter, Routes, useNavigate, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import { UserContext } from "./components/context";
import Home from "./components/home";
import CreateAccount from "./components/createaccount";
import Login from "./components/login";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Balance from "./components/balance";
import AllData from "./components/alldata";
import './App.css'

function App() {
  // State setup
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  function ProtectedComponent({ component: Component }) {
    // context setup
    const ctx = React.useContext(UserContext);
    const navigate = useNavigate();

    // redirect users to the login page if they ar not logged in
    React.useEffect(() => {
      if (!ctx.currentUser) {
        navigate("/login/");
      }
    }, [ctx.currentUser, navigate]);

    return ctx.currentUser ? <Component /> : null;
  }

  // updates a user if they exist and adds them if they did not.
  const updateUser = (user) => {
    const index = users.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      //user exists, update it
      setUsers(users.map((u, i) => (i === index ? user : u)));
    } else {
      // user does not exist, add it
      setUsers([...users, user]);
    }
  };

  const value = { users, currentUser, updateUser, setCurrentUser };

  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider value={value}>
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />

            <Route
              path="/deposit/"
              element={<ProtectedComponent component={Deposit} />}
            />
            <Route
              path="/withdraw/"
              element={<ProtectedComponent component={Withdraw} />}
            />
            <Route
              path="/balance/"
              element={<ProtectedComponent component={Balance} />}
            />

            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
