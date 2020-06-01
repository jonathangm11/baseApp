const express = require('express');
const path = require('path');
var cors = require('cors')

const server = express();
// Serve static assets
const root = path.resolve(__dirname);

server.use(cors());

server.use((req, res, next) => {
  res.cookie('APP_ENV', process.env.APP_ENV || 'development');
  next();
});

server.use(express.static(root));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);  
});