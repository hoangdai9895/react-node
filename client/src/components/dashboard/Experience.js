import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import { deleteExperience }   from '../../actions/profileActions'


class Experience extends Component {
    
    onDeleteClick(id) {
        this.props.deleteExperience(id)
    }

  render() {
    // console.log(this.props.experience)
      const  experience  = this.props.experience.map(exp => {
          return (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">
                    {exp.from}
                </Moment>
                    -
                    {
                        exp.to===null ? ('Now') : (<Moment format="YYYY/MM/DD">
                        {exp.to}
                        </Moment>)
                    }
                
            </td>
            <td><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, exp._id)}>Delete</button></td>
           </tr>

      )})
    //   console.log(experience)
    return (
      <div >
        <h4 className="mb-4">Experience Credential</h4>
        <table className="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
            </tr>
        </thead>
        <tbody> 
            {experience}
        </tbody>
            
        </table>
      </div>
    )
  }
}

Experience.propsTypes = {
    deleteExperience : PropTypes.func.isRequired
}
export default connect(null, {deleteExperience})(Experience) ;