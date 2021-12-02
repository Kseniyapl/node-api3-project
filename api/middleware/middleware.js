//imports

const User = require('../users/users-model');

//middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    "message": `Horror in the router: ${err.message}`
  })
}
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  handleError
}
