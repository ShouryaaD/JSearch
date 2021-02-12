import React, { Component } from 'react';

class CreatePost extends Component {
    state = {
        title: '',
        timeReq: '',
        description: '',
        skillsets : []
   }
 
     changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }
   changesHandler = (e) => {
     let { name, value } = e.target;
     let ar = [];
     ar.push(value);
    this.setState({ skillsets: ar });

    }
    
    render() {
        return (<form className="form"
         onSubmit={e => {
          this.props.onCreating(e, {
           title: this.state.title,
            timeReq: this.state.timeReq,
            description: this.state.description,
            skillsets: this.state.skillsets

          })
         }}
        >
        <div className="form-group">
          <label for="Title">Title</label>
          <input type="text" className="form-control" id="title" name='title' placeholder="Title" onChange={ this.changeHandler}/>
         
        </div>
        <div className="form-group">
          <label for="Duration">Duration</label>
          <input type="text" className="form-control" name= 'timeReq' id="Duration" placeholder="Duration" onChange = {this.changeHandler} />
          </div>
            <div className="form-group">
          <label for="Post">Enter Post</label>
          <input type="text" className="form-control" name= 'skilset' id="skillset" placeholder="Designation" onChange = {this.changesHandler} />
       </div>
       <div className="form-group">
          <label for="Description">Description</label>
          <textarea  rows="15" className="form-control" name= 'description' id="desription" placeholder="description" onChange = {this.changeHandler} />
          </div>
          
  
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>);
    }
  
 
}
 

export default CreatePost;