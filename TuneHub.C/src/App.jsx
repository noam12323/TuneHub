import './App.css';
import Register from './components/register';
import Login from './components/login';
import SongList from './components/songList';


import { ToastContainer } from "react-toastify";
import React, { useState } from "react";


function App() {
  const [value,setValue] = useState('');
  const [user, setUser] = useState({});
  return (
    <div className="App">

      <ToastContainer></ToastContainer>
      <h1>Welcome to TuneHub {user.name}</h1>
      {user.userID && <button style={{float:"left", marginLeft:"2px",height:"2rem", width:"5rem"}} onClick={()=>setUser({})}>
        log out
      </button> }
      {!user.userID &&  <Register />}
      {!user.userID && <Login onLogin={setUser}/>}
      {user.userID  && <div>
        
        <input placeholder={'חיפוש'} value={value} onChange={(e)=>{
        setValue(e.target.value)}} style={{height:"2rem",direction:'rtl'}}/>
         <SongList  search={value}/>
         </div>}
    </div>
  );
}

export default App;
