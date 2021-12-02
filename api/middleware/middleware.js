//imports

const Users = require('../users/users-model');

//middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next()
}

async function validateUserId(req, res, next) {
    const user = await Users.getById(req.params.id)
    try{
      if (user) {
        req.user = user;
        next()
      } else {
        next({ status: 404, message: "not found"})
      }
  } catch (err) {
    res.status(404).json('Error retrieving from database')
    }
  }

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" })
  }
  else {
    next()
  }
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
