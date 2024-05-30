const mongoose = require('mongoose'); // מייבאים את המודול mongoose שיעזור לנו להתקשר עם מסד הנתונים MongoDB.
const Joi = require('joi'); // מייבאים את המודול Joi לצורך אימות נתונים.

const ObjectId = mongoose.Schema.Types.ObjectId; // מגדירים משתנה שמכיל את סוג הנתונים ObjectId מתוך סכימת המונגוס.

// מגדירים את סכימת הנתונים של הפלייליסט באמצעות המודל mongoose.Schema.
const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true }, // שדה של שם הפלייליסט, חובה להכיל ערך מסוג String.
    user: { type: ObjectId, ref: "User", required: true }, // שדה של מזהה המשתמש שיצר את הפלייליסט, חובה להכיל ערך מסוג ObjectId המתייחס למודל "user".
    desc: { type: String }, // שדה של תיאור הפלייליסט, יכול להכיל ערך מסוג String או להיות ריק.
    songs: { type: Array, default: [] }, // שדה של רשימת השירים בפלייליסט, מכיל ערך מסוג מערך עם הגדרת ערך הברירת מחדל ריקה.
    img: { type: String } // שדה של קישור לתמונת הפלייליסט, יכול להכיל ערך מסוג String או להיות ריק.
});

// פונקציה שבודקת תקינות הפלייליסט באמצעות מודול Joi.
const validatePlaylist = (playlist) => {
    const schema = Joi.object({
        name: Joi.string().required(), // אימות שדה השם - חובה להכיל ערך מסוג String.
        user: Joi.string().required(), // אימות שדה המשתמש - חובה להכיל ערך מסוג String.
        desc: Joi.string().allow(''), // אימות שדה התיאור - מתיר ערך מסוג String או ריק.
        songs: Joi.array().items(Joi.string()), // אימות שדה השירים - מתיר ערכים מסוג String במערך.
        img: Joi.string().allow('') // אימות שדה התמונה - מתיר ערך מסוג String או ריק.
    });
    return schema.validate(playlist); // מחזיר את תוצאת אימות הנתונים על פי הסכימה.
};

// מגדירים מודל mongoose עבור הפלייליסט על פי סכימת הנתונים שהגדרנו מראש.
const PlayList = mongoose.model("PlayList", playlistSchema);

module.exports = { PlayList, validatePlaylist }; // מייצאים את המודל Playlist ואת הפונקציה validatePlaylist.
