const mongoose = require('mongoose');
const nodeEnv = process.env.NODE_ENV || "development";
const config = require('../config.json')[nodeEnv];
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoURL);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: {
    hash: { type: String, required: true},
    salt: { type: String, required: true},
    iterations: { type: Number, required: true}
  },
  decks: [{
    name: {type: String, default: "New Deck"},
    cards: [{
      question: {type:String, required:true},
      answer: {type:String, required:true}
    }]
  }]
});

const User = mongoose.model('Users', userSchema);

module.exports = User;