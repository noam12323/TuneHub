import React, { useState } from "react";
import axios from "axios";
import { toast  ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({onLogin}) {
  const [values, setValues] = useState({
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

  const notify = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "dark",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      try {
        const response = await axios.post("http://localhost:4000/login", {
          email: values.email,
          password: values.password
        });
        if (response.status === 200) {
          // Login successful
          // notify("Welcome back!", "success");
          alert("Welcome back!")
          const res = response.data;
          onLogin(res);
          // Perform any other actions after successful login, such as redirecting to another page
        }
      } catch (error) {
        // Login failed
        alert("Error logging in. Please check your credentials")

        // notify("Error logging in. Please check your credentials.", "error");
        console.error("There was an error logging in!", error);
      }
    } else {
      // Form not filled properly
      
      alert("Please fill in all fields properly.", "error");
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <input
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <button className="form-field" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
