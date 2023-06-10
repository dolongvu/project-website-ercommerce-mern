const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
title:{
    type:String,
},
url:{
type:String
},
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("navItem", eventSchema);
