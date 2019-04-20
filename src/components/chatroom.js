import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';

export default class Chatroom extends Component {

  constructor(props){
    super(props)
    this.state={
      message:[],
      user:'',
      
      new_message:'',
      socket:null

    }
    
  }
 
  componentDidMount(){
    this.setState({
      user:this.props.username,
      
    })
    var socket=this.props.socket;
    socket.on('display_msg',(data)=>{
      console.log(data);
      var user=data.user;
      var message=[...this.state.message,data]
      this.setState({
        message,
        
      });
    })
      
  }
  handleLeaveRoom=(e)=>{
    this.props.socket.emit('leaveroom',this.props.room)
  }
  
  
  handleChat=(e)=>{
   
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  
  handleSubmit=(e)=>{
    
    e.preventDefault();
     
    
    var socket=this.props.socket;
    socket.emit('msg_sent',{room:this.props.room,message:this.state.new_message,user:this.state.user});
    this.setState({
      new_message:''
    })
   }

  render() {
    
    
    let messages;
    console.log(this.state.message)
    if(this.state.message.length>0){
        messages=this.state.message.map((obj,index)=>{
            return(
              <div >
                <p className="blue-text">{obj.user}:</p><p> {obj.message}</p>
              </div>
              
            )
        })
        
    }
    

    return (
      <div className="container" >
        <h4>{this.props.room}</h4>
        {messages}
        <form onSubmit={this.handleSubmit} className="container" style={{position:"fixed",bottom:0,left:0,right:0}}>
        <input id="new_message" type="text" onChange={this.handleChat} value={this.state.new_message}/>
      <button className="btn blue" > Send</button>
      </form>
      <NavLink to="/" ><button className="btn red" onClick={this.handleLeaveRoom} style={{position:"fixed",top:70,right:100}}> Leave room</button></NavLink>
      </div>
    )
  }
}
