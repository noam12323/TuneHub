import "./register.css";
import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.name && values.email && values.password) {
      try {
        await axios.post("http://localhost:4000/signup", {
          name: values.name,
          email: values.email,
          password: values.password
        });
        setValid(true);
      } catch (error) {
        console.error("There was an error creating the user!", error);
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              Welcome {values.name}
            </h3>
            <div>Your registration was successful!</div>
          </div>
        )}
        {!valid && (
          <>
            <input
              className="form-field"
              type="text"
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
            {submitted && !values.name && (
              <span id="name-error">Please enter a name</span>
            )}

            <input
              className="form-field"
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
            {submitted && !values.email && (
              <span id="email-error">Please enter an email address</span>
            )}

            <input
              className="form-field"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
            {submitted && !values.password && (
              <span id="password-error">Please enter a password</span>
            )}

            <button className="form-field" type="submit">
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
}
