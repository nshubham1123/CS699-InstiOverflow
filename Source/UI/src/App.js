import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import './App.css';

import HomePage from './pages/HomePage/HomePage';
import TagsPage from './pages/AllTags/TagsPage';
import UsersPage from './pages/AllUsers/UsersPage';
import Register from "./pages/signIn/Register";
import Login from "./pages/Login/Login";
import Post from "./pages/Post/Post";
import PostForm from "./pages/PostForm/PostForm";
import TagPage from './pages/singleTag/TagPage';
import UserPage from './pages/singleUser/UserPage';
import CoursePage from './pages/CoursePage/Main';
import Alert from './components/alert/alert.component';
import { loadUser } from "./redux/auth/auth.actions";

import Header from "./components/navbar/navbar";
import setAuthToken from "./redux/auth/auth.utils";

if (localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    } , []);

    return (
        <Provider store={store}>
            <div className="App">
                <Header />
                <Alert />
                <Switch>
                    <Route exact path='/' component={CoursePage} />
                    <Route exact path='/dashboard' component={CoursePage} />
                    <Route exact path='/dashboard/:courseId/add/question' component={PostForm} />
                    <Route exact path='/dashboard/:courseId' render={(props) => <HomePage {...props}/>}/>
                    {/* <Route exact path='/questions' component={QuestionsPage} /> */}
                    <Route exact path='/tags' component={TagsPage} />
                    <Route exact path='/users' component={UsersPage} />
                    <Route exact path='/jobs' component={HomePage} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/questions/:id' component={Post} />
                    <Route exact path='/users/:id' component={UserPage} />
                    <Route exact path='/tags/:courseId/:tagname' component={TagPage} />
                    
                </Switch>
            </div>
        </Provider>
    );
};

export default App;
