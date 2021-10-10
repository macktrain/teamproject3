const { Schema, model } = require('mongoose');

const requestSchema = new Schema({
  sender: {
    type: String,
    trim: true,
  },
  receiver: {
    type: String,
    trim: true,
  },
  response: {
    type: String,
    trim: true,
  },
});


const Request = model('Request', requestSchema);

module.exports = Request;
