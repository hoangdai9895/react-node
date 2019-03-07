import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classname from 'classname';
import {deletePost} from '../../actions/postActions'
 class PostItem extends Component {
    onDeleteClick(id) {
        this.props.deletePost(id)
    }
  render() {
      const {post, auth} = this.props;
    //   console.log(post)
    

    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar} alt ='anh'/>
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <a href="post.html" className="btn btn-info mr-1">
              Comments
            </a>
            <Link to={`/post/${post._id}`} className='btn btn-info'>Comments</Link>
            {post.user === auth.user.id ? (
                <button type='button' className='btn btn-danger ml-1' onClick={this.onDeleteClick.bind(this, post._id)}>
                    <i className="fas fa-times"></i>
                </button>
            ): null}
          </div>
        </div>
      </div>
      
    )
  }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {deletePost})(PostItem) ;