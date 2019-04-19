import React, { Component } from 'react'

export default class UserLogin extends Component {
    state={
        username:''
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.username);
        this.props.setUserState(this.state.username);
    }
  render() {

    
    return (
      <div className="container">
        <h3>Enter user name</h3>
        <form onSubmit={this.handleSubmit}>
            
            <input id="username" type="text" onChange={this.handleChange}/>
           
            <button className="btn"> Submit</button>
        </form>
      </div>
    )
  }
}
