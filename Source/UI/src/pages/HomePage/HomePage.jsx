import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTopPosts } from '../../redux/posts/posts.actions';

import SideBar from '../../components/leftSidePanel/leftSide.';
import PostItem from '../../components/postItem/postItem.component';

import Spinner from '../../components/spinner/spinner';
import './HomePage.styles.scss';
import { useLocation } from 'react-router-dom';

/**
 * Home page
 * @component
 * @param getTopPosts - get all the top posts for particular course
 */

const HomePage = ({props, getTopPosts, post: { posts, loading }  }) => {
    const location = useLocation();
    console.log("this.props",location);
    const courseId=location.pathname.split("/")[2];
    useEffect(() => {
        getTopPosts(courseId);
    }, [ getTopPosts ]);
    
   
    return loading || posts === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='homepage fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Top Questions</h3>
                        <div className='questions-btn'>
                            <Link to={`/dashboard/${courseId}/add/question`}>
                                <button className = 's-btn s-btn__primary' >Ask Question</button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className='questions'>
                        {posts.map(post => (
                            <PostItem key={post.id} post={post} courseId={courseId}/>))}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
};

HomePage.propTypes = {
    getTopPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getTopPosts })(HomePage);