const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
  index: String,
  name: String,
  type: String,
  size: String,
  alignment: String,
  armor_class: Number,
  hit_points: Number,
  challenge_rating: Number,
});

module.exports = mongoose.model('Monster', MonsterSchema);
