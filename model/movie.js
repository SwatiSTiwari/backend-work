const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tconst: {
    required: true,
    type: String,
  },
  title_type: {
    required: true,
    type: String,
  },

  primary_title: {
    required: true,
    type: String,
  },

  runtimeMinutes: {
    required: true,
    type: Number,
  },
  genres: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", movieSchema);
