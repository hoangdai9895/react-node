import React, { Component } from 'react';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types'
import PostFeed from './PostFeed'


class Posts extends Component {
    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.post.posts.length !== this.props.post.posts.length) {
    //         this.props.getPosts();
    //     }
    // }
    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        const { posts, loading } = this.props.post;

        let postContent;
        if (posts === null || loading) {
            postContent = < Spinner > </Spinner>
        } else {
            postContent = < PostFeed posts = { posts } > </PostFeed>
        }
        return ( <div className = "feed" >
            <div className = 'container' >
            <div className = "row" >
            <div className = "col-md-12" >
            <PostForm > </PostForm> { postContent } </div> </div> </div> </div>
        )
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    post: state.post
})
export default connect(mapStateToProps, { getPosts })(Posts);