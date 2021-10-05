const db = require('../config/connection');
const { Profile } = require('../models');
const { Friends } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const friendsSeeds = require('./friendsSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Friends.deleteMany({});
    await Profile.create(profileSeeds);
    await Friends.create(friendsSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
