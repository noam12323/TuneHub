# TuneHub 🎵

A full-stack music streaming web application inspired by Spotify, built as a final project for my Practical Software Engineering studies.

## Features

- 🎧 **Custom segment-based audio streaming** — server streams MP3 files in 100KB chunks on demand, with the client decoding and queueing segments seamlessly via the Web Audio API
- 🔐 User registration and login with bcrypt password hashing
- 📚 Personal playlists (create, edit, add/remove songs)
- 🔍 Song search
- 🎚️ Real-time audio playback with custom buffer management

## Tech Stack

**Frontend** — React 18, Hooks, Axios, Web Audio API, React-Toastify  
**Backend** — Node.js, Express, MongoDB (Mongoose), bcrypt, Joi validation  
**Architecture** — Client / Server separation, REST API

## Project Structure

```
TuneHub/
├── TuneHub.C/      # React client
│   └── src/
│       ├── components/   # AudioStreamer, Login, Register, SongList, Song
│       └── App.jsx
└── TuneHub.S/      # Node.js + Express server
    ├── controllers/      # User authentication logic
    ├── models/           # User, Playlist, Song (Mongoose schemas)
    ├── routes/           # API endpoints
    ├── songs/            # MP3 library
    └── server.js
```

## How the Custom Streaming Works

Instead of relying on standard HTTP audio streaming, the server exposes  
`GET /song/:fileName?segment=N` which returns a 100KB slice of the requested file.  
The client (`AudioStreamer.jsx`) requests segments sequentially, decodes each one with `AudioContext.decodeAudioData`, and pushes them into a playback queue — allowing smooth playback while the next chunk downloads in the background.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017`

### Server
```bash
cd TuneHub.S
npm install
npm start            # runs on port 4000
```

### Client
```bash
cd TuneHub.C
npm install
npm start            # runs on port 3000
```

## Author

**Noam Cohen** — Computer Science student at HIT (Holon Institute of Technology)
