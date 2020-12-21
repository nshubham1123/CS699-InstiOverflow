import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTags } from '../../redux/tags/tags.actions';

import './TagsPage.styles.scss'
import SideBar from '../../components/leftSidePanel/leftSide.';
import TagPanel from './TagPanel';
import Spinner from "../../components/spinner/spinner";

/**
 * Page containing all tags
 * @component
 * @param getTags - Get all tags
 * @param tag - Details for particular tag
 * @param tag.tags -All Tags
 * @param tag.loading - Loading of tags is required
 */

const TagsPage = ({ getTags , tag: { tags, loading }}) => {
    useEffect(() => {
        getTags();
    }, [getTags]);

    return loading || tags === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='tags-page fc-black-800'>
                    <h1 className='headline'>Tags</h1>
                    <p className='fs-body'>
                        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                    </p>
                    <div className='headline-count'>
                        
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {tags.map(tag => (
                                <TagPanel key={tag.tagname} tag = {tag}/>))}
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </Fragment>
};

TagsPage.propTypes = {
    getTags: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps,{ getTags })(TagsPage);