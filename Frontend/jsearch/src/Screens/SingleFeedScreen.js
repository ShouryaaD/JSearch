import axios from 'axios';
import React, { Component } from 'react';

class SinglePost extends Component {
    state = {
    title: '',
    creator: '',
    duration: '',
    description: ''
  };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        console.log(postId);
        axios.get('http://localhost:8080/feed/' + postId).then(res => {
            return res.data.post;
        })
            .then(resData => {
                console.log(resData);
                this.setState({ title: resData.title, creator: resData.creator.name, duration: resData.timeReq, description: resData.description });
            })
            .catch(err => {
                console.log(err);
        })
   }
   
    applyHandler() {
        console.log('Apply from here');
        axios.post('http://localhost:8080/feed/apply', {
            userId: this.props.curuser,
            postId: this.props.match.params.postId
        }).then(resData => {
            console.log(resData.data);
        }).catch(err => { console.log(err) });
          this.props.history.replace('/applicant/applied');
    }

    render() {
        return (
            <div>
                <div className ="row col-md-12 m-2 justify-content-center">
                    <h1> {this.state.title} </h1>
                    
                </div>
                
                <div className="row col-md-12 m-2 justify-content-start"> 
                    <h3> {this.state.creator} </h3>
                </div>
                 <div className="row col-md-12 m-2 justify-content-start"> 
                    <p> {this.state.description}</p>
                </div>
                 
                <div className="row col-md-12 m-2 justify-content-center">
                    <button className="btn btn-primary" onClick={this.applyHandler.bind(this)}> Apply </button>
                </div>



                </div >
    )
    }
}

export default SinglePost;