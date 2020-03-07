const mongoose = require("mongoose");

const Appletusers = new mongoose.Schema({
    name:String,
    username:String,
    password:String
})


mongoose.model("Appletuser", Appletusers, "Appletuser");