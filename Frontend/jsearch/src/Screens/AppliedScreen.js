import React, { Component } from 'react';
import axios from 'axios'
import Post from '../components/Post/Post'

class AppliedScreen extends Component {
    state = {
        finalFeed: [],
    }
    
    componentDidMount() {
        console.log( this.props.userId);
          const options = {
        url: 'http://localhost:8080/feed/associate',
        method: 'POST',
              contentType: 'application/json',
              data: {
            userId : this.props.userId,
        }
    }
        axios(options)
            .then(res => {
                return res.data;
            })
            .then(resData => {
                
                this.setState({ finalFeed: resData.associated });
            })
            .catch(err => {
                console.log(err);
        })
    }

    render() {
        return (
          <div>
             
             {  
                this.state.finalFeed.map(post =>(
                    <Post id={post._id} title={post.title} duration={post.timeReq} creator={post.creator.name}/>
            ))
                }
        </div>  
        );
    }
}

export default AppliedScreen;