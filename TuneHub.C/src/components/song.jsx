import React from "react";

export default function Song({ name, className,setSelectedSong }) {
  return <h1 onClick={(e)=>setSelectedSong(e.target.innerHTML)} className={className}>{name}</h1>;
}
