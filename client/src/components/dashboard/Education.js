import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import { deleteEducation}   from '../../actions/profileActions'


class Education extends Component {
    
    onDeleteClick(id) {
        this.props.deleteEducation(id)
    }

  render() {
    // console.log(this.props.experience)
      const  education  = this.props.education.map(edu => {
          return (
          <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">
                    {edu.from}
                </Moment>
                    -
                    {
                        edu.to===null ? ('Now') : (<Moment format="YYYY/MM/DD">
                        {edu.to}
                        </Moment>)
                    }
                
            </td>
            <td><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, edu._id)}>Delete</button></td>
           </tr>

      )})
    //   console.log(experience)
    return (
      <div >
        <h4 className="mb-4">Education Credential</h4>
        <table className="table">
        <thead>
            <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
            </tr>
        </thead>
        <tbody> 
            {education}
        </tbody>
            
        </table>
      </div>
    )
  }
}

Education.propsTypes = {
    deleteEducation : PropTypes.func.isRequired
}
export default connect(null, {deleteEducation})(Education) ;