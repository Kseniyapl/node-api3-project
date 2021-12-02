//imports

const express = require('express');
const { logger } = require("./middleware/middleware")
const usersRouter = require('./users/users-router')



//express
const server = express();

//global middleware
server.use(express.json());
server.use(logger);

//const useMiddleware = require("./middleware/middleware")


server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
