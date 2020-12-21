import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/auth/auth.actions';
import PropTypes from 'prop-types';

import { ReactComponent as Logo } from '../../assets/LogoGlyphMd.svg';

/**
 * Render Login Page
 * @component
 * @param login - User login data
 * @param login.username - username of user
 * @param login.password - password of user
 * @param isAuthenticated - user authentication required
 */

const Login = ({ login, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({ username, password });
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <div className='auth-page'>
            <div className='register-content'>
                <div className='register-grid'>
                    <div>
                        <div className='icon-holder'>
                            <Logo className='icon'/>
                        </div>
                        <div className='form-container'>
                            <form className='login-form' onSubmit={e => onSubmit(e)}>
                                <div>
                                    <label className='form-label s-label fc-black-600'>Username</label>
                                    <input
                                        className='form-input s-input'
                                        type='text'
                                        name='username'
                                        value={username}
                                        onChange={e => onChange(e)}
                                        id='username'

                                    />
                                </div>
                                <div>
                                    <label className='form-label s-label fc-black-600'>Password</label>
                                    <input
                                        className='form-input s-input'
                                        type='password'
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        id='password'

                                    />
                                </div>
                                <div className='grid gs4 gsy fd-column js-auth-item '>
                                    <button className='s-btn s-btn__primary' id='submit-button' name='submit-button'>Log in</button>
                                </div>
                            </form>
                            
                        </div>
                        <div className='redirects fc-black-500'>
                            Don't have an account? <Link to='/register' name='login'>Sign up</Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);