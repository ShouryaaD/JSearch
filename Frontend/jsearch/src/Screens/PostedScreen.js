import axios from 'axios';
import React, { Component } from 'react';

class Posted extends Component {
    state = {
    title: '',
    creator: '',
    duration: '',
        description: '',
        applicant: [],
        applicantStatus: false
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
   
    ShowHandler() {
        this.setState({  applicationStatus: true});
        axios('http://localhost:8080/feed/posted', {
            method: 'POST',
            contentType: 'application/json',
            data:
            {postId: this.props.match.params.postId}
        }).then(res => {
            return res.data;  
        }).then(resData => {
            this.setState({ applicant: resData.applied , applicationStatus: true});
        }).catch(err => { console.log(err) });
    }
    DeleteHandler() {
         this.setState({  applicationStatus: true});
    }

    render() {

        let component;
        if (this.state.applicantStatus === false) {
            component = (<div>
                <button className="btn btn-primary" onClick={this.ShowHandler.bind(this)}>Show Applicants</button>
                <button className="btn btn-danger m-2" onClick={this.DeleteHandler.bind(this)}>Delete Job</button>
                        </div>);
        }
        if (this.state.applicationStatus === true) {
            component = this.state.applicant.map(app => (
                <div>
                <h5>{app.name}</h5>
                    <p> {app.email}</p>
                    </div>
              ));
        }

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
                   
                </div>

                 {component}

                </div >
    )
    }
}

export default Posted;