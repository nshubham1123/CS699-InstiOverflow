
/** 
 * @module models/answers
 */

const helperFunction = require('../helperfunction/helperFunction');

/**
 * @typedef {Object} Answer
 * @property {string} body - it contains question content
 * @property {number} user_id - User Id
 * @property {number} post_id - Question Id
 */


const Answer = function(answer) {
    this.body = answer.body;
    this.user_id = answer.user_id;
    this.post_id = answer.post_id;
};



/**
 * @method create
 * @param {Answer} newAnswer -Stores answer object
 * @param {Json} result -Result returned in json format
 */

Answer.create = (newAnswer, result) => {
    const query = `INSERT INTO answers(body,user_id,post_id) VALUES(?,?,?);`;

    pool.query(
        query,
        [newAnswer.body, newAnswer.user_id, newAnswer.post_id ],
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
                helperFunction.responseHandler(true, 200, 'Answer Added', res.insertId)
            );
        });
};


/**
 * @method remove
 * @param {integer} id -Id of answer
 * @param {Json} result -Result returned in json format
 */

Answer.remove = (id, result) => {
    const query = ` DELETE FROM answers WHERE id = ?;`;

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
                helperFunction.responseHandler(true, 200, 'Answer Removed', null)
            );
        });
}


/**
 * @method retriveAll
 * @param {integer} postId -Id of question
 * @param {Json} result -Stores all answers for given question
 */

Answer.retrieveAll = (postId, result) => {
    let query = ` SELECT
                    answers.id, post_id, answers.user_id, username, answers.body, answers.created_at 
                    FROM answers 
                    JOIN posts ON posts.id = post_id 
                    JOIN users ON users.id = answers.user_id 
                    WHERE post_id = ?;`;

    pool.query(query,
        postId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no answers', null),
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


module.exports = Answer;