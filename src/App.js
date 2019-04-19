import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import UserLogin from './components/userlogin';
import Rooms from './components/rooms';
import Chatroom from './components/chatroom';
import Trial from './components/trial'
class App extends Component {
  state={
    userlogin:true,
    username:'taylor',
    current_room:'',
    room_joined:false,
    socket:null

  }
  
  setUserState=(username)=>{
    this.setState({
      userlogin:true,
      username
    })
    console.log(this.state)
  }

  selectRoom=(room,socket)=>{
    this.setState({
      current_room:room,
      room_joined:true,
      socket:socket
    })
  }

  render() {
    if(this.state.userlogin===false){
      return (
        <div className="App">
          <BrowserRouter>
            <Navbar/>
            <Route exact path="/" render={(props)=><UserLogin {...props} setUserState={this.setUserState}/>}/>
            
          </BrowserRouter>
        </div>
      );
    }
    else if(this.state.userlogin===true){
      return(
      <BrowserRouter>
        <Navbar/>
        <Route exact path="/" render={(props)=><Rooms {...props} username={this.state.username} selectRoom={this.selectRoom} />} />
        <Route exact path="/chatroom" render={(props)=><Chatroom {...props} room={this.state.current_room} username={this.state.username} 
               socket={this.state.socket}/>}/>
      </BrowserRouter>
       ) }
  }
// render(){
//   return(
//     <div className="App">
// <Trial/>

//     </div>
//   )
// }





}

export default App;
