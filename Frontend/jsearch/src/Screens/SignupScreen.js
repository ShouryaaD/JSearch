import React, { Component } from 'react';
class Signup extends Component {

   state = {
    email: '',
     password: '',
     isRecruiter: false,
     name: ''
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });

  }
  checkHandler = (e) => {
      
    const value = e.target.checked;
     this.setState({ isRecruiter: value });
  }
  render() {
              return(
                <form className="form"
                  onSubmit={
                    e => {
                      this.props.onSignup(e, {
                        email: this.state.email,
                        password: this.state.password,
                        isRecruiter: this.state.isRecruiter,
                        name: this.state.name
                  })}
        }
          
          
         
                >
  <div className="form-group">
          <div className="form-group">
          <label for="name">Name</label>
          <input type="name" class="form-control" name= 'name' id="name" placeholder="name" onChange = {this.changeHandler} />
        </div>
          
                    <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" name='email' placeholder="Enter email" onChange={ this.changeHandler}/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name= 'password' id="password" placeholder="Password" onChange = {this.changeHandler} />
        </div>    <div class="form-check">
    
    <input type="checkbox" className="form-check-input" id="isRecruiter" name = "isRecruiter" onClick = {this.checkHandler}/>
     <label class="form-check-label" for="isRecruiter">I am a Recruiter</label>
        </div>  
  <button type="submit" class="btn btn-warning mt-2">Submit</button>
</form>
);
  }  
    

}

export default Signup;
