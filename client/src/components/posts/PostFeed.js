import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
// import Spinner from '../common/Spinner'



 class PostFeed extends Component {

    
  
  render() {
    const {posts} = this.props
     
    return posts.map(post => <PostItem key ={ post._id} post={post}></PostItem>)
  }
}


PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}
export default PostFeed
