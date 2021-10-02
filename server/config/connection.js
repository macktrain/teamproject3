const mongoose = require('mongoose');

const username = "dbuser";
const password = "p4ssw0rd";

mongoose.connect(
  `mongodb+srv://${username}:${password}@frienderapp-cluster.25u7v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;
