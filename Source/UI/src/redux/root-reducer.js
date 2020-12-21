import { combineReducers } from 'redux';
import alert from './alert/alert.reducer';
import auth from './auth/authReducer';
import post from './posts/posts.reducer';
import user from './users/users.reducer';
import tag from './tags/tags.reducer';
import answer from './answers/answers.reducer';
import comment from './comments/commentsReducer';

export default combineReducers({
    alert,
    auth,
    post,
    user,
    tag,
    answer,
    comment
});