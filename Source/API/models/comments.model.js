/** Express router providing user related routes
 * @module models/comments
 */

/**
 * @typedef {Object} Comment
 * @property {string} body - it contains comment content
 * @property {number} user_id - User Id
 * @property {number} post_id - Question Id
 */
const helperFunction = require('../helperfunction/helperFunction');

// constructor
const Comment = function(answer) {
    this.body = answer.body;
    this.user_id = answer.user_id;
    this.post_id = answer.post_id;
};

/**
 * @method create
 * @param {Comment} newComment -Stores comment object
 * @param {Json} result -Result returned in json format
 */
Comment.create = (newComment, result) => {
    const query = `INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);`;

    pool.query(
        query,
        [newComment.body, newComment.user_id, newComment.post_id ],
        (err,res) => {
            if (err) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Comment Added', res.insertId)
            );
        });
};

/**
 * @method remove
 * @param {integer} id -Id of comment
 * @param {Json} result -Result returned in json format
 */
Comment.remove = (id, result) => {
    const query = ` DELETE FROM comments WHERE id = ?;`;

    pool.query(query,
        id,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Comment Removed', null)
            );
        });
}
/**
 * @method retriveAll
 * @param {integer} postId -Id of question
 * @param {Json} result -Stores all comment for given question
 */

Comment.retrieveAll = (postId, result) => {
    let query = `   SELECT
                    comments.id, post_id, comments.user_id, username, comments.body, comments.created_at 
                    FROM comments 
                    JOIN posts ON posts.id = comments.post_id 
                    JOIN users ON users.id = comments.user_id 
                    WHERE post_id = ?;`;

    pool.query(query,
        postId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no comments', null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Success', results)
            );
        });
}


module.exports = Comment;