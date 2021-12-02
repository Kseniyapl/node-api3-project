const express = require('express');

const server = express();

server.use(express.json());
const usersRouter = require('./users/users-router')

//const useMiddleware = require("./middleware/middleware")



server.use('/api/users', usersRouter)
//server.use('/api/middleware', useMiddleware)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
