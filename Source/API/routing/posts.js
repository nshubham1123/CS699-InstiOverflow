/** Express router providing user related routes
 * @module routers/posts
 */

const auth = require('../middlewares/auth');
const checkOwnership = require('../middlewares/checkOwnership');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const postsController = require('../controllers/posts');


/** 
 * Get all posts
 * @name  get questions
 *  @route {GET} /api/posts
 */


router.get('/', postsController.getPosts);

/** 
 * fetch all posts sorted by maximum interactivity
 * @name  fetch all posts sorted by maximum interactivity
 *  @route {GET} /api/posts/top
 */


router.get('/top/:courseId', postsController.getPosts);

 /** 
 *  fetch all posts of a specific tag
 * @name   fetch all posts of a specific tag
 *  @route {GET} /api/posts/tag/:tagname
 */

router.get('/tag/:tagname/:courseId', postsController.getPosts);

  /** 
 *  fetch a single post
 * @name   fetch a single post
 *  @route {GET} /api/posts/:id
 */


router.get('/:id',postsController.getSinglePost);


/** 
 *  add a post
 * @name   add a post
 *  @route {POST} /api/posts/
 */

router.post(
    '/',
    [
        auth,
        [
            check('title', 'Enter a title with minimum 15 characters').isLength({min:15}),
            check('body','Enter a body with minimum 30 characters').isLength({min:30})
        ],
    ], postsController.addPost);

  /** 
 *  delete a post
 * @name   delete a post
 *  @route {DELETE} /api/posts/:id
 */

router.delete('/:id', [ auth, checkOwnership ], postsController.deletePost);

module.exports = router;