import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Song from './song';
import AudioStreamer from './AudioStreamer';

import "react-toastify/dist/ReactToastify.css";
import './songList.css';

export default function SongList({search}) {
  const [songs, setSongs] = useState([]);
  const [selectedSong,setSelectedSong] = useState(null);
  console.log(search);
  const songsToShow = songs.filter((song)=>song.includes(search))

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/search");
      if (response.status === 200) {
        const res = response.data;
        setSongs(res);
      }
    } catch (error) {
      alert("Error logging in. Please check your credentials");
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <>
    <div className="song-list">
      {songsToShow.map((song, i) => {
        return <Song key={i} name={song} setSelectedSong={setSelectedSong} className="song-item" />;
      })}
      <br/>

      
    </div>
              { selectedSong &&  <AudioStreamer songName={selectedSong}/>}
                </>

  );
}
