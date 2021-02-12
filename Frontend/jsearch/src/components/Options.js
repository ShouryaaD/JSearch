import React from 'react';

const options = (props) => {
    
    return (
        <option value={props.value}>{props.field}</option>
    );

}

export default options;