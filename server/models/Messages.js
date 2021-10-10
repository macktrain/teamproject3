const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true,
    trim: true,
  },
  receiver: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  }
});


const Message = model('Message', messageSchema);

module.exports = Message;
