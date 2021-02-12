import React, { Component } from 'react';
class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }
  render() {
    return (
        
      <form className="form"
        onSubmit={e => {
          this.props.onLogin(e, {
            email: this.state.email,
            password: this.state.password
          })
         }}
       >
        <div className="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" name='email' placeholder="Enter email" onChange={ this.changeHandler}/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name= 'password' id="password" placeholder="Password" onChange = {this.changeHandler} />
        </div>
  
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    );
  }
}
    


export default Login;
