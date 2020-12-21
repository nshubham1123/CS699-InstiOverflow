/** Express router providing user related routes
 * @module routers/tags
 */

const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags');



/** 
 * Get all tags
 * @name  get all tags
 *  @route {GET} /api/tags
 */



router.get('/', tagsController.getTags);

module.exports = router;