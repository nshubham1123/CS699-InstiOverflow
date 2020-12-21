import React, {useEffect,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTagPosts } from '../../redux/posts/posts.actions';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/leftSidePanel/leftSide.';
import PostItem from '../../components/postItem/postItem.component';
import Spinner from "../../components/spinner/spinner";

/**
 * Page to show all details related to single tag
 * @component
 * @param getTagPosts - get Post related to particular tag
 * @param post - single post details
 * @param post.posts - all posts related to tag
 * @param post.loading - It should be loaded
 * 
 */

const TagPage = ({ getTagPosts, post: { posts, loading }, match  }) => {
    const location = useLocation();
    console.log("this.props",location);
    const courseId=location.pathname.split("/")[2];
    console.log("courseId is",courseId)
    useEffect(() => {
        getTagPosts(match.params.tagname,courseId);
        // eslint-disable-next-line
    }, [getTagPosts]);

    return loading || posts === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>

            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Questions tagged [{match.params.tagname}]</h3>
                        <div className='questions-btn'>
                            <Link to='/add/question'>
                                <button className = 's-btn s-btn__primary'>Ask Question</button>
                            </Link>
                        </div>
                    </div>
                    <div className='questions'>
                        {posts.length === 0 ? ( <h4 style={{margin: '30px 30px'}}>There are no questions from this tag</h4> ) :
                            posts.map(post => (
                                <PostItem key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </Fragment>


};


TagPage.propTypes = {
    getTagPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getTagPosts })(TagPage);