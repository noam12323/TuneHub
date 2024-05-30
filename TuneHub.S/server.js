const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const songRoutes = require("./routes/songsRoutes");
const playListRoutes = require("./routes/playlistsRoutes");

app.use(userRoutes);
app.use("/songs/", songRoutes);
app.use("/playlists/", playListRoutes);



const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://localhost:27017/SpotifyDB", {})
  .then(async (result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// מסלול לטיפול בחיפוש קבצים
app.get("/search", (req, res) => {
  // תיקייה בה השירים מאוחסנים
  const songsDirectory = path.join(__dirname, "songs");

  // קריאת תוכן התיקייה שבה מאוחסנים השירים
  fs.readdir(songsDirectory, (err, files) => {
    if (err) {
      // אם מתרחשת שגיאה, החזרת תשובת שגיאה
      return res.status(500).send("שגיאה בקריאת תיקיית השירים");
    }

    // סינון קבצים שאינם MP3
    const mp3Files = files.filter((file) => file.endsWith(".mp3"));

    // שליחת רשימת השירים בתצורת JSON כתגובה
    res.json(mp3Files);
  });
});

// מסלול לספק קובץ MP3 מסוים
app.get("/song/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "songs", fileName);
  const segment = req.query.segment ?? 0;

  const SEGMENT_SIZE = 1 * 1024 * 100;

  const start = SEGMENT_SIZE*segment

  const end = start + SEGMENT_SIZE

  // קבלת נתוני הקובץ כדי לקבוע את גודלו
  fs.stat(filePath, (err, stat) => {
    if (err) {
      // אם הקובץ לא נמצא או אם מתרחשת שגיאה, החזרת תשובת שגיאה
      return res.status(404).send("הקובץ לא נמצא");
    }

    const fileSize = stat.size;

    // יצירת פלטר קריאה לקובץ ה-MP3
    const readStream = fs.createReadStream(filePath,{start:start,end:end});

    writeByChunks(readStream,res)
   
    // הגדרת כותרות מתאימות לתגובה
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": Math.min(SEGMENT_SIZE,fileSize-start),
      "MAX-SEGMENT":(fileSize/SEGMENT_SIZE) | 0
    });


    // טיפול בשגיאות
    readStream.on("error", (err) => {
      res.end(err);
    });
  });
});

function writeByChunks(source,target){

  source.on('data', function (chunk) {
    target.write(chunk);
  });

  source.on('end', function () {
    target.end();
  });

}

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
