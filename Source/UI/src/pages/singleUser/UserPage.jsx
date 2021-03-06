import React, {useEffect,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../redux/users/users.actions';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/LogoGlyphMd.svg';

import SideBar from '../../components/leftSidePanel/leftSide.';

import './UserPage.styles.scss'
import Spinner from "../../components/spinner/spinner";
/**
 * Page to show all details related to single user
 * @component
 * @param getUser - get all details of user
 * @param user - single user details
 */

const UserPage = ({ getUser, user: { user, loading }, match  }) => {
    useEffect(() => {
        getUser(match.params.id);
        // eslint-disable-next-line
    }, [getUser]);

    return loading || user === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='user-main-bar pl24 pt24'>
                    <div className='user-card'>
                        <div className="grid--cell s-navigation mb16">
                            <Link to="#" className="s-navigation--item is-selected"
                               data-shortcut="P">Profile</Link>
                            
                        </div>
                        <div className='grid'>
                            <div className='img-card'>
                                <div className='avatar-card'>
                                    <div className='avatar'>
                                        <Link className='avatar-link' to={`/users/${user.id}`}>
                                            <div className='logo-wrapper'>
                                                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXw8PDdy4Xx8vXcyX7s6Nzg0prr59jh05/cyHvt6t/f0JXbx3bx8/fdy4Pj16vv7uzezIro4cj87/UvAAACA0lEQVR4nO3cYU7CUBCFUYRWWrSo+9+sS+BOMg9e9HwLmM5p4BdkTidJkiRJkvRH+1r6+koeuPc9b4+Ey8elq4/34Hnndet63nY7R8LLW1eXSHg9up53rISE1QgJqxES1iMkrEZIWI+QsBohYT1CwmqEhPUICasREtYjJKxGSFiP8FXC7UiKhMvn+WGfmTBaKhPutzXoO1nrWK9B2ahoq3skPD1+7b0vvu/jcM6A2Vvo+/JkRV/pzggJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQn/jzD8lbtT2PcLdnQ1Yl+z3/GTSwjZpJ/kuETn1YhwrffHLX0v6xVXI4InNn7g/SeKsB4hYTVCwnqEhNUICesRElYjJKxHSFiNkLAeIWE1QsJ6hITVCAnrEc4tTE4JbJnw0nWWoFX4nRxxuC2J8B6Nyq5U9AmPte+IQ3SlYs+26hQ2nqB49laEhGMiJBw1qy9CwlGz+iIkHDWrL0LCUbP6IiQcNasvQsJRs/oiJBw1qy9CwlGz+iIkHDWrL0LCUbP6InyRMDpAkZ16mFQYHaDITj3MKpxy1KRrERLOvxYh4fxrERLOvxYh4fxrERLOvxYh4fxrERLOvxYh4fxrERLOvxYh4fxrERLOv1arcEuOOGRrTTnqtN+SKw73ZNaco7IrDo0HIZ4/SpIkSZKkP9gvDI+byX8+aAgAAAAASUVORK5CYII=' alt='user-logo'/>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='title'>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='content-card'>
                                <div className='content-grid'>
                                    <div className='info-cell'>
                                        <div className='info'>
                                            <div className='details'>
                                                <h2>{user.username}</h2>
                                            </div>
                                            <div className='date'>
                                                <p>
                                                    user created &nbsp;-&nbsp;{ moment(user.created_at).fromNow(true) } ago
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='stats-cell'>
                                        <div className='count-sec'>
                                            <div className='counts'>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.answer_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            answers
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.post_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            questions
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.comment_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            comments
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.tag_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            tags
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-grid'>
                        <div className='grid-cell1'>
                            <div className='cell-layout'>
                                
                            </div>
                        </div>
                        <div className='grid-cell2'>
                            <div className='top-tags'>
                                <h3 className='fw-bold fc-dark bc-black-3'>
                                    Top Used Tags
                                </h3>
                                <div className='top-tags-sec'>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell bg-black-025'>
                                                <Link className='s-tag s-tag__lg' to='/tags/java'>
                                                    java
                                                </Link>
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt fc-light'>Posts</span>
                                                            <span className='number fc-black-800'>2</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell bg-black-025'>
                                                <Link className='s-tag s-tag__md' to='/tags/node.js'>
                                                    node.js
                                                </Link>
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt fc-light'>Posts</span>
                                                            <span className='number fc-black-800'>1</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell bg-black-025'>
                                                <Link className='s-tag s-tag__md' to='/tags/react'>
                                                    react
                                                </Link>
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt fc-light'>Posts</span>
                                                            <span className='number fc-black-800'>0</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    </Fragment>


};

UserPage.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser })(UserPage);