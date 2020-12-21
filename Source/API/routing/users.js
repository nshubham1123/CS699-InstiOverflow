/** Express router providing user related routes
 * @module routers/users
 */

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkExistence = require('../middlewares/checkExistence');
const usersController = require('../controllers/users');

/** 
 * Get all users
 * @name  get all users
 *  @route {GET} /api/users
 */


router.get('/', usersController.getUsers);


/** 
 * Get single user
 * @name  get single user
 *  @route {GET} /api/users/:id
 */


router.get('/:id', usersController.getUsers);

 /** 
 * Register user
 * @name  Register a new user
 *  @route {POST} /api/users/:id
 */


router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({ min: 5 }),
        check(
            'password',
            'Please enter a password with 5 or more characters'
        ).isLength({ min: 5 }), checkExistence
    ], usersController.register);

module.exports = router;