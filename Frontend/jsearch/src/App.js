import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'
import axios from 'axios';
import FeedScreen from './Screens/FeedScreen';
import jwt from 'jwt-decode';
import CreatePost from './Screens/CreatePost'
import SingleFeedScreen from './Screens/SingleFeedScreen'
import AppliedScreen from './Screens/AppliedScreen'
import PostedScreen from './Screens/PostedScreen'
import SelectSkillScreen from './Screens/SelectSkill'
class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    name: null, 
    isRecruiter: false,
    skill: null
  }

  componentDidMount() {
    
    const token = localStorage.getItem('token');
    console.log(token);
    const expiryDate = localStorage.getItem('expirydate');
    console.log(this.state.isAuth);
      if (!token) {
      return;
    }
   
    const data = jwt(token);
    const userId = localStorage.getItem('userId');
  
      
    this.setState({ isAuth: true, token: token, userId: userId, name: data.name, isRecruiter: data.isRecruiter });
    
    

  }
  createPostHandler(e, postData) {
    e.preventDefault();
    console.log(this.state + 'This handles seet');
    const options = {
      url: 'http://localhost:8080/feed',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      
      data: {
        title: postData.title,
        description: postData.description,
        timeReq: postData.timeReq,
        skillsets: postData.skillsets,
        creator: this.state.userId
      }
    }
      axios(options)
        .then(res => {
          console.log("Post created Successfully");
          this.props.history.replace('/recruiter/posted');
      })

      
    }
    
  skillSelectHandler(event, skillData) {
    event.preventDefault();
    console.log(skillData);
    
    this.setState({ skill: skillData.skill });

    this.props.history.replace('/feed/show/'+skillData.skill);

 }
  
  logoutHandler() {
     this.setState({ isAuth: false, token: null, userId: null, name: null, isRecruiter: false});
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  }
   loginHandler = (event, authData) => {
     event.preventDefault();
     const options = {
       url: 'http://localhost:8080/login',
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       data: {
         email: authData.email,
         password: authData.password
        }
      

     }

     axios(options)
       .then(res => {
         console.log(res.status);
         if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
        
        }
        return res.data;
       })
       .then(resData => {
         
         this.setState({ isAuth: true, token: resData.token, userId: resData.userId, isRecruiter: resData.isRecruiter, name: resData.name });
         console.log(this.state);
         localStorage.setItem('token', resData.token);
         localStorage.setItem('userId', resData.userId);
         this.props.history.replace('/');

       })
       .catch(err => {
         console.log(err);
         this.setState({
           isAuth: false,
         })
     })
   }
  signupHandler = (e, authData) => {
    e.preventDefault();
    
    axios.put('http://localhost:8080/signup', {
      name: authData.name,
      email: authData.email,
      password: authData.password,
      isRecruiter: authData.isRecruiter
    }).then(res => {
      console.log(res);
       this.props.history.replace('/');
    })
      .catch(err => {
        console.log(err);
    })
  }
    setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };
  render() {
    let routes;
    if(!this.state.isAuth)
      { routes =  (
          <Switch>
          <Route
          path="/"
          exact
          render={props => (
            <LoginScreen
              {...props}
              onLogin={this.loginHandler}
              
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignupScreen
              {...props}
              onSignup={this.signupHandler}

             
            />
          )}
        />
        <Redirect to="/" />
          </Switch>
      )
    }

    if (this.state.isAuth && this.state.isRecruiter) {
     routes = ( <Switch>
      <Route
          path="/"
          exact
          render={props => ( <CreatePost
              {...props}
              onCreating={this.createPostHandler.bind(this)}
             
            />
          )}
        />
        
      <Route
        
          path="/recruiter/posted"
          exact
         render={props => (
            <AppliedScreen      
              {...props}
              userId = {this.state.userId}
            />
           
          )}
       />
       <Route
          path="/feed/:postId"
          exact
          render={props => (
            <PostedScreen      
              {...props}
              curuser = {this.state.userId}
            />
          )}
           />
       
      
      <Redirect to="/" />
       </Switch>
      )
    }
     if (this.state.isAuth && this.state.isRecruiter===false)
     {
       console.log("I am here");
       routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <SelectSkillScreen 
             onSubmit = {this.skillSelectHandler.bind(this)}
              {...props}
            />
          )}
           />
           
            <Route
          path="/feed/:postId"
          exact
          render={props => (
            <SingleFeedScreen       
              {...props}
              curuser = {this.state.userId}
            />
          )}
           />

           <Route
          path="/feed/show/:skill"
          exact
          render={props => (
            <FeedScreen      
              {...props}
              curuser={this.state.userId}
              skill = {this.state.skill}
            />
          )}
           />
           
            <Route
          path="/applicant/applied"
          exact
          render={props => (
            <AppliedScreen      
              {...props}
              userId = {this.state.userId}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
  
    }
    
    return (
      
     <div>
        <Navbar
          isAuth={this.state.isAuth}
          isRecruiter={this.state.isRecruiter}
          name={this.state.name}
        logout={this.logoutHandler.bind(this)}
        />
        <div class="container mt-2">
           {routes}
          </div>
        </div>
        
    );
  }
}

export default withRouter(App);
