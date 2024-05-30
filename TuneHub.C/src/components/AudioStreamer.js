import React, { useState, useRef } from 'react';

const AudioStreamer = ({songName}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const readerRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const audioBufferQueueRef = useRef([]);
  let segment = 0;

  const fetchBySegment = async () =>{
    console.log(songName)
    const response = await fetch('http://localhost:4000/song/'+songName+'?segment='+segment);
    readerRef.current = response.body.getReader();
    console.log(response);
    segment ++;
  }


  const fetchAudioStream = async () => {
    await fetchBySegment();
    processChunk();
  };

  const processChunk = async () => {
    const { done, value } = await readerRef.current.read();
    if (done) {
      console.log('Segment finished.');
      await fetchAudioStream();
      return;
    }

    // Decode the audio chunk
    const audioBuffer = await audioContextRef.current.decodeAudioData(value.buffer);

    // Add the buffer to the queue
    audioBufferQueueRef.current.push(audioBuffer);

    // Play the buffer if not already playing
    if (!sourceNodeRef.current) {
      playFromQueue();
    }

    // Continue processing the next chunk
    processChunk();
  };

  const playFromQueue = () => {
    if (audioBufferQueueRef.current.length === 0) {
      sourceNodeRef.current = null;
      return;
    }

    const buffer = audioBufferQueueRef.current.shift();

    const sourceNode = audioContextRef.current.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioContextRef.current.destination);
    sourceNode.onended = playFromQueue; // Play the next buffer when this one ends
    sourceNode.start();

    sourceNodeRef.current = sourceNode;
  };

  const handlePlayButtonClick = () => {
    if (!isPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      setIsPlaying(true);
      fetchAudioStream();
    } else {
      setIsPlaying(false);
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      sourceNodeRef.current = null;
      audioBufferQueueRef.current = [];
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return (
    <div>
      <button onClick={handlePlayButtonClick}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default AudioStreamer;
