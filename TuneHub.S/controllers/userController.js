const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
      console.log("reach signup");
      const email = req.body.email;
      const isEmailUnique = await User.findOne({ name: req.body.name });
  
      if (isEmailUnique) {
        return res.status(409).json("email already exists");
      }
      const name = req.body.name;
      const password = req.body.password;
  
      const hashPassword = await bcrypt.hash(password, 10);
  
      const userID = new mongoose.Types.ObjectId();
  
      const user = new User({
        ID: userID,
        name: name,
        password: hashPassword,
        email: email,
      });
  
      user.save();
      console.log("Created user");
      return res.status(200).json({
        userID: userID,
        name: name,
        email: email,
      });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      if (!email || !password) {
        return res.status(400).json({ msg: "user params empty" });
      }
  
      const loadedUser = await User.findOne({ email: email });
      // console.log(loadedUser);
  
      if (!loadedUser) {
        return res.status(404).json({ msg: "email not exists" });
      }
      const isValidPassword = await bcrypt.compare(password, loadedUser.password);
  
      if (!isValidPassword) {
        return res.status(404).json({ msg: "password not exists" });
      }
      console.log("logged in success");
      return res.status(200).json({
        userID: loadedUser.ID,
        name: loadedUser.name,
        email: loadedUser.email,
      });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err });
    }
  };
  
  exports.changePassword = async (req, res) => {
    console.log("changing password");
    const userID = req.body.userID;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
  
    const loadedUser = await User.findOne({ ID: userID });
  
    if (!loadedUser) {
      return res.status(404).json("user not found");
    }
  
    const currPassword = loadedUser.password;
  
    const isValidPassword = await bcrypt.compare(oldPassword, currPassword);
  
    if (!isValidPassword) {
      return res.status(401).json("entered the wrong current password");
    }
    if (newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      loadedUser.password = hashPassword;
  
      await loadedUser.save();
      return res.status(200).json("changed password");
    } else {
      return res.status(401).json("you did not enter a new password");
    }
  };
