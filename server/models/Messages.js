const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const messageSchema = new Schema({
  sender: {
    type: Object,
    required: true,
    unique: true,
    trim: true,
  },
  receiver: {
    type: Object,
    required: true,
    unique: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  msgId: {
    type: Number,
    required: true,
    unique: true,
  },
});


const Message = model('Message', messageSchema);

module.exports = Message;
