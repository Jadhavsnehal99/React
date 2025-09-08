"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confiPassword, setConfiremedPassword] = useState("");

  const [errors, setErrors] = useState({});
    
  const handlesubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};

    // Name validation
    if (name=== "") {
      tempErrors.name = "Name is required";
    }
    else if (name.length <5) tempErrors.name = "Name must be at least 5 characters ";

    // Email validation
    if (email=== "") {
      tempErrors.email = "Email is required";
    }
    else if (!email.includes("@")) tempErrors.email = "Email is required";

    // Phone  validation
    if (Phone=== "") {
      tempErrors.Phone = "Phone is required";
    }
       else if (Phone.length <10) tempErrors.Phone = "Phone must be at least 5 characters ";
    

      // password validation
    if (password=== "") {
      tempErrors.password = "password is required";
    }
    else if (password.length <6) tempErrors.password = "password must be at least 6 characters ";
    }
    
    // confirmpassword validation
    if (confipassword=== "") {
      tempErrors.confiPassword = "password is required";
    }
  
    else if (confiPassword.length <6) tempErrors.confiPassword = "password is can not match ";
    }
    
    
    setErrors(tempErrors);
  {

    // If no errors, form is valid
    if (Object.keys(tempErrors).length === 0) {
      alert("Registration successful");

      // Reset from 
      setName("");
      setErrors({});
    }

    


  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handlesubmit}>
        <div>
          <label> Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div style = {{ colour : "red"}}>{errors.name}</div>}
          </div>
          
          <div>
            <label>Email:</label><br />
            <input 
             type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
             {errors .email && <div style = {{ colour : "red"}}>{errors.email}</div>}
          </div>

          <div>
            <lebel>password:</lebel><br />
            <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
              {errors.password && <div style={{ color: "red"}}>{errors.password}</div>}
            </div> 

            <div>
              <label>confirm Password:</label><br />
              <input
                type="password"
                value={confiPassword}
                onChange={(e) => setConfiremedPassword(e.target.value)}
                />
                {errors.confiPassword && <div style={{ color: "red"}}>{errors.confiPassword}</div>}
              </div> 

              <button type="submit">submit</button> 
              </form>
             </div>
  );
  }