import './App.css';
import Register from './components/register';
import Login from './components/login';
import SongList from './components/songList';


import { ToastContainer } from "react-toastify";
import React, { useState } from "react";


function App() {

  const [user, setUser] = useState({});
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <h1>Welcome to TuneHub {user.name}</h1>
      {user.userID==null &&  <Register />}
      {user.userID ==null && <Login onLogin={setUser}/>}
      {user.userID  && <SongList/>}
    </div>
  );
}

export default App;
