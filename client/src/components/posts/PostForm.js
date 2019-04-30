import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

 class PostForm extends Component {
   constructor(props) {
     super(props);

     this.state = {
       media: "",
       text: "",
       errors: {}
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

   }
   componentWillReceiveProps(newProps) {
     if (newProps.errors) {
       this.setState({ errors: newProps.errors });
     }
   }
   onSubmit(e) {
     e.preventDefault();

     const { user } = this.props.auth;

     const newPost = {
       media: this.state.media,
       text: this.state.text,
       picture:this.state.pictures,
       name: user.name,
       avatar: user.avatar
     };

     this.props.addPost(newPost);
     this.setState({ text: "", media: "" });
   }

   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }

 
   render() {
     const { errors } = this.state;
     return (
       <div className="post-form mb-3">
         <div className="card card-info">
           <div className="card-header bg-info text-white">
             Say Something...
           </div>
           <img className="card-img-bottom img-fluid" src={this.state.media} width="100" height="100" alt=""></img>
           <div className="card-body">
             <form onSubmit={this.onSubmit}>
               <div className="form-group">
                 <TextAreaFieldGroup
                   placeholder="Add media"
                   name="media"
                   value={this.state.media}
                   onChange={this.onChange}
                   error={errors.text}
                 />
                 <TextAreaFieldGroup
                   placeholder="Create a post"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange}
                   error={errors.text}
                 />
               </div>

               <button type="submit" className="btn btn-dark">
                 Submit
               </button>
             </form>
           </div>
         </div>
       </div>
     );
   }
 }
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
