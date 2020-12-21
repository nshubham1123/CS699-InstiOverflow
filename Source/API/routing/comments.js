/** Express router providing user related routes
 * @module routers/comments
 */

const auth = require('../middlewares/auth');
const checkOwnership = require('../middlewares/checkOwnership');
const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const commentsController = require('../controllers/comments');

/** 
 * Get all comments
 * @name  get comments
 *  @route {GET} /api/posts/comments/:id 
 */
router.get('/:id', commentsController.getComments);

/** 
 * Add a comment
 * @name  Add comment
 *  @route {POST} /api/posts/comments/:id 
 */
router.post(
    '/:id',
    [
        auth,
        [
            check('body','body is required')
                .not()
                .isEmpty()
        ]
    ], commentsController.addComment);

 /** 
 * Delete a comment
 * @name  Delete comment
 *  @route {DELETE} /api/posts/comments/:id 
 */

router.delete('/:id', [ auth, checkOwnership ], commentsController.deleteComment);



module.exports = router;