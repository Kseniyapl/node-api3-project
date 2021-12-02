//imports

const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { 
  logger,
  validateUserId, 
  validateUser, 
  validatePost,
  handleError
} = require('../middleware/middleware');

//express

const router = express.Router();

//endpoints

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  try{
    res.json(req.user)
  }catch(error){
    next(error)
  }
});

router.post('/', validateUser, (req, res, next) => {
  const newUser = req.body;
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error=>{
      next(error)
    })
});

router.put('/:id', validateUserId, validateUser,(req, res, next) => {
  const changes = req.body
  Users.update(req.user.id, changes)
    .then(updatedUser => {
      res.status(201).json(updatedUser)
    })
    .catch(error=>{
      next(error)
    })
  })
 

router.delete('/:id', validateUserId, async (req, res, next) => {
try{
  const deletedUser = await Users.getById(req.params.id)
  await Users.remove(req.params.id)
  res.status(200).json(deletedUser)
}catch (error) {
  next(error)
}
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;