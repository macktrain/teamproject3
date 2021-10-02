const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const friendsSchema = new Schema({
  sender: {
    type: Object,
    required: true,
    unique: true,
    trim: true,
  },
  friends: [
    {
      type: Object,
      trim: true,
    },
  ],
});


const Friends = model('Friends', friendsSchema);

module.exports = Friends;
