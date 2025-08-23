"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confiPassword, setConfiremedPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};

    // Name validation
    if (name === "") tempErrors.name = "Name is required";
    else if (name.length < 2) tempErrors.name = "Name must be at least 2 characters";

    // Email validation
    if (email === "") tempErrors.email = "Email is required";
    else if (!email.includes("@")) tempErrors.email = "Email is valid";

   // password validation
    if (password === "") tempErrors.password = "password is required";
    else if (password.length < 6) tempErrors.password = "password must be at least 6 characters";

    // confirm password validation
    if (confiPassword === "") tempErrors.confiPassword = "Confirm password is required";
    else if (confiPassword !== password) tempErrors.confiPassword = "Password do not match";

    setErrors(tempErrors);

    // If no errors, form is valid
    if (Object.keys(tempErrors).length === 0) {
      alert("Registration Successful!");
      console.log("Name:", name);
     

      // Reset form
      setName(""); 
      setErrors({});
    }
  };

  return (
  
    <div>
      <center>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confiPassword}
            onChange={(e) => setConfiremedPassword(e.target.value)}
          />
          {errors.confiPassword && <div style={{ color: "red" }}>{errors.confiPassword}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
      </center>
    </div>
  );
}