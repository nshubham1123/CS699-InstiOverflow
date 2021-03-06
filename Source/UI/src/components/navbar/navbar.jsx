import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions'

import { ReactComponent as Logo } from '../../assets/LogoMd.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';

import './navbar.scss';

/**
 * Component showing navigation bar
 * @component
 * @param auth - authorization is required
 * @param auth.isAuthenticated - Is user authenticated
 * @param auth.loading - is page loaded
 * @param logout - logout is reqired
 */

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
    /**
     * This is authorization links
     */
    const authLinks = (
        <div className='btns'>
            <Link onClick={ logout } to='/login'>
                <button type='button' className='s-btn s-btn__filled'>Log out</button>
            </Link>
        </div>
    );

 


    const guestLinks = (
        <div className='btns'>
            <Link to='/login'>
                <button type='button' className="s-btn s-btn__primary">Log in</button>
            </Link>
            <Link to='/register'>
                <button type='button' className='s-btn s-btn__filled'>Sign up</button>
            </Link>
        </div>

    );

    return(
        <nav className='navbar fixed-top navbar-expand-lg navbar-light bs-md'>
            <Link className='navbar-brand' to='/'>
                InstiOverflow
            </Link>
            
            <form id="search" role="search" method="get"
                  className="grid--cell fl-grow1 searchbar px12 js-searchbar " autoComplete="off">
                <div className="ps-relative">
                    <input name="q"
                           type="text"
                           placeholder="Search&#x2026;"
                           maxLength="240"
                           className="s-input s-input__search js-search-field "/>
                           <Search/>
                </div>
            </form>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    )
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logout } )(Header);