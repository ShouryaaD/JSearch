import axios from 'axios';
import React, { Component } from 'react';
import Options from '../components/Options'
class SelectSkill extends Component {
    state = {
        options: [],
        skill: null
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/feed/getskill')
            .then(res => {
                return res.data;
            }).then(resData => {
                this.setState({options:resData.skillset})
            }).catch(err => {
            console.log(err);
        })
    }
    changeHandler = (e) => {
        const {name,value} = e.target;
        
    this.setState({ skill: value });

  }
    render() {
      
       
        return (
            <form className="form"
            onSubmit={e => {
          this.props.onSubmit(e, {
            skill: this.state.skill,
          })
         }}>
        <div class="form-group">
  <label for="sel1">Select Jobs:</label>
  <select class="form-control" id="sel1" name = "skill" onChange={this.changeHandler.bind(this)}>
                <Options value="Not Selected" field="Not Selected"/>
                    {  
                this.state.options.map(skill =>(
                    <Options value={skill} field={skill}/>
            ))
                    }
   
                    
                </select>
                 <button type="submit" className="btn btn-primary m-2">Submit</button>
                </div>
                </form>
    )}
}

export default SelectSkill;