/** Express router providing user related routes
 * @module routers/auth
 */

const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');

/** 
 * Get all logged in User Details
 * @name  get logged in users
 *  @route {GET} /api/auth
 */

router.get('/' , auth , authController.loadUser);

/** 
 * Log in User
 * @name Log in User
 *  @route {POST} /api/auth
 */

router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Password is required'
        ).not().isEmpty()
    ], authController.login);

module.exports = router;