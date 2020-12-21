import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';

import './UsersPage.styles.scss'
import SideBar from '../../components/leftSidePanel/leftSide.';
import UserPanel from './UserPanel';
import Spinner from "../../components/spinner/spinner";

/**
 * Page containing all users
 * @component
 * @param getUsers - Get all users
 * @param user - Details for particular user
 * @param user.users -All Users
 * @param user.loading - Loading of users is required
 */


const UsersPage = ({ getUsers, user: { users, loading }  }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return loading || users === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id='content'>
                <div id='mainbar' className='users-page fc-black-800'>
                    <h1 className='headline'>Users</h1>
                    <div className='headline-count'>
                        
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {users.map(user => (
                                <UserPanel key={user.id} user = {user}/>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
};

UsersPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps,{ getUsers })(UsersPage);