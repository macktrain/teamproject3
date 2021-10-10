const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const friendsSchema = new Schema({
  sender: {
    type: String,
    required: true,
    trim: true,
  },
  friends: [
    {
      type: String,
      trim: true,
    },
  ],
});


const Friends = model('Friends', friendsSchema);

module.exports = Friends;
