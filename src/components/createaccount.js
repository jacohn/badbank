// Import necessary React modules, hooks, Contexts, and Components
import React, { useState } from "react";
import { UserContext, Card } from "./context";
import { Link } from "react-router-dom";
import "../App.css";

function CreateAccount() {
  // Use state
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Use context
  const ctx = React.useContext(UserContext);

  // Function to validate form fields are not empty
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    // Ensure password is at least 8 characters long
    if (label === "password" && field.length < 8) {
      setStatus("Error: Password must be at least 8 characters long");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    /* put a success message here */
    return true;
  }

  // Function to handle the create account button being clicked
  async function handleCreate(e) {
    e.preventDefault();
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const url = `/account/create/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);
      ctx.updateUser({ name, email, password, balance: 0.0 });
      setShow(false);
    } catch (error) {
      console.error("There was an error creating the account", error);
    }
  }

  // Function to clear the form when user wants to create another account.
  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  // Render the component
  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <form onSubmit={handleCreate}>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              disabled={!name || !email || !password}
            >
              Create Account
            </button>
          </form>
        ) : (
          <>
            <h5>Success</h5>
            <button
              type="submit"
              className="btn btn-light button-spacing"
              onClick={clearForm}
            >
              Add another account
            </button>
            <button type="button" className="btn btn-light button-spacing">
              <Link className="nav-link" to="/login/">
                Login
              </Link>
            </button>
          </>
        )
      }
    />
  );
}

// Export component as CreateAccount
export default CreateAccount;
