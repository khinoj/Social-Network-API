// import mongoose
const { connect, connection } = require('mongoose');
// set up mongoose on Heroku or on localhost
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDb';
// connection
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// export connection
module.exports = connection;

