
/** Express router providing user related routes
 * @module routers/answers
 */


const auth = require('../middlewares/auth');
const checkOwnership = require('../middlewares/checkOwnership');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const answersController = require('../controllers/answers');


/** 
 * Get all comments
 * @name  Fetch all answers of question
 *  @route {GET} /api/posts/answers/:id 
 */


router.get('/:id', answersController.getAnswers);


/** 
 * Add answer
 * @name  Add answer to a question
 *  @route {POST} /api/posts/answers/:id 
 */


router.post(
    '/:id',
    [
        auth,
        [
            check('text','text is required')
                .not()
                .isEmpty()
        ]
    ], answersController.addAnswer);


/** 
 * Delete Answer
 * @name  delete answers
 *  @route {DELETE} /api/posts/answers/:id 
 */


router.delete('/:id', [ auth, checkOwnership ], answersController.deleteAnswer);

module.exports = router;