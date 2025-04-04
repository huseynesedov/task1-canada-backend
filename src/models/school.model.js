const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainSchoolImg: { type: String, required: true },
  schoolRoomImgs: [
    { type: String, required: true },
  ],
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

module.exports = mongoose.model("Schools", schoolSchema);
