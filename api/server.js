const express = require('express');

const server = express();

const usersRouter = require('./users/users-router')
const middlewareRouter = require("./middleware/middleware")

server.use(express.json());

server.use('/api/users', usersRouter)
server.use('/apш/middleware', middlewareRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
