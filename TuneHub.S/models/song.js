const mongoose = require("mongoose"); // יבוא של המודול mongoose שמשמש ליצירת סכמה ומודלים במסד הנתונים
const Joi = require("joi"); // יבוא של המודול joi שמשמש לאימות נתונים

const songSchema = new mongoose.Schema({ // הגדרת סכמה עבור מודל השירים במסד הנתונים
    name: { type: String, required: true }, // שדה השם של השיר - מחייב ערך נוכחי
    artist: { type: String, required: true }, // שדה האמן של השיר - מחייב ערך נוכחי
    song: { type: String, required: true }, // שדה השיר עצמו - מחייב ערך נוכחי
    img: { type: String, required: true }, // שדה כתובת התמונה של השיר - מחייב ערך נוכחי
    duration: { type: String, required: true }, // שדה משך השיר - מחייב ערך נוכחי
});

const validateSong = (song) => {
    const schema = Joi.object({ // הגדרת סכימת עבור אובייקט השיר
        name: Joi.string().required(), // אימות שם השיר
        artist: Joi.string().required(), // אימות שם האמן
        song: Joi.string().required(), // אימות נתיב השיר
        img: Joi.string().required(), // אימות כתובת התמונה
        duration: Joi.string().required(), // אימות משך השיר
    });
    return schema.validate(song); // החזרת תוצאת האימות
};

const Song = mongoose.model("Song", songSchema); // הגדרת מודל השיר באמצעות Mongoose
module.exports = { Song, validateSong }; // ייצוא של מודל השיר והפונקציה לאימות
