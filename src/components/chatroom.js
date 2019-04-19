import React, { Component } from 'react'

export default class Chatroom extends Component {

  constructor(props){
    super(props)
    this.state={
      message:[''],
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
      console.log('is this the one',data)
    })
      
  }
  
  
  handleChat=(e)=>{
   
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  
  handleSubmit=(e)=>{
    
    e.preventDefault();
     
    
    var socket=this.props.socket;
    socket.emit('msg_sent',{room:this.props.room,message:this.state.new_message});
   }

  render() {
    
    
    
    

    return (
      <div className="container">
        <h4>{this.props.room}</h4>
        
        <form onSubmit={this.handleSubmit}>
        <input id="new_message" type="text" onChange={this.handleChat} value={this.state.new_message}/>
      <button className="btn" > Send</button>
      </form>
      </div>
    )
  }
}
