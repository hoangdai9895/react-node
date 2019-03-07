import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import TextAreaFiledGroup from '../common/TextAreaFiledGroup';
import { addPost } from '../../actions/postActions'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { user } = this.props.auth
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost);
        this.setState({text: ''})
    }

    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps.errors)
        if(newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }
  render() {
    // console.log(this.state)
    const { errors } = this.props;
    
    return (
      <div className="post-from mb-3">
          <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                Say Somthing...
                </div>
                <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextAreaFiledGroup
                        placeholder="Create a post"
                        name="text"
                        value={this.state.text}
                        // defaultValue = {this.sate.text}
                        onChange={this.onChange}
                        error = {errors.text}
                    >
                    </TextAreaFiledGroup>


                    </div>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
                </div>
            </div>
            </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

PostForm.propTyepes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {addPost})(PostForm) 