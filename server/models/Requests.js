const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const requestSchema = new Schema({
  sender: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  receiver: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  response: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});


const Request = model('Request', requestSchema);

module.exports = Request;
