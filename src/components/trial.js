import React, { Component } from 'react'
import openSocket from 'socket.io-client'
export default class Trial extends Component {

    state={
        socket:null,
        message:'',
        list_of_messages:[]
    }
    componentDidMount(){
        const socket=openSocket("http://localhost:4000");
        this.setState({
            socket
        });
        socket.on('welcome',(data)=>{
            console.log(data)
        });
        socket.on('display_msg',(data)=>{
            console.log(data);
            var list_of_messages=[...this.state.list_of_messages,data];
            this.setState({
                list_of_messages
            })
        })
    }
    handleChange=(e)=>{
        this.setState({
        [e.target.id]:e.target.value
    })
    console.log(this.state.message)
    }

    handleSend=(e)=>{
        e.preventDefault();
        const socket=this.state.socket;
        socket.emit('msg_sent',this.state.message);
        // socket.on('display_msg',(data)=>{
        //     console.log(data)
        // })
    }
  render() {
      var texts=this.state.list_of_messages.map((msg,index)=>{
          return(
              <div key={index}>
              <p>User:</p><p>{msg}</p>
                </div>
          )
      })
    return (
      <div className="container">
       {texts}
      <form onSubmit={this.handleSend} className="container">
        <input id="message" onChange={this.handleChange} className=""/>
        <button className="btn blue">Send</button>
        </form>
       
      </div>
    )
  }
}
