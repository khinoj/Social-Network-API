//importing express library
const express = require('express');

//database connection from file.
const db = require('./config/connection');

//routes location
const routes = require('./routes');

//Port setup and creating express application
const PORT = process.env.PORT || 3001;
const app = express();

//middleware helps understand url
app.use(express.urlencoded({ extended: true }));
//middleware parses json
app.use(express.json());
//use routes from above to find path.
app.use(routes);

//database listener and for which port.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
