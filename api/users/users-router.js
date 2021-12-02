//imports

const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { 
  
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

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const userPosts = await Users.getUserPosts(req.params.id)
    res.status(200).json(userPosts)
  } catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async  (req, res, next) => {
  try{
    const { id } = req.params
    const  { text } = req.body;
    const  newPost =  await Posts.insert({ text, user_id: id })
   res.status(200).json(newPost)
  }
    catch(error) {
      next(error)
    }
})

router.use(handleError)

module.exports = router;