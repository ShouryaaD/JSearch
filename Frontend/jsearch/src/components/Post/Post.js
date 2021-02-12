import React from 'react';
import './Post.css'
import {Link} from 'react-router-dom'
const post = (props) => {
    
    return (
        <Link to= {`/feed/${props.id}`} style={{ textDecoration: 'none', color: 'black'}}>
        <div className="blogbox m-2">
            <h1 className=" row m-2">{props.title}</h1>
            <p className="row m-2 "> Posted by : {props.creator} </p>
            <p className="row m-2 " > Time Duration : {props.duration} </p>
            </div>
            </Link>
    );
}

export default post;