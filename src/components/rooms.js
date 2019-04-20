import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {BrowserRouter,Route,NavLink } from 'react-router-dom';
import Chatroom from './chatroom'

export default class Rooms extends Component {
    state={
        rooms:[
            {name:'Mandya',id:1},
        {name:'Mysore',id:2}
        ],
        join:false,
        create:false,
        newroom:'',
        id:'',
        socket:null,
        room_joined:false,
        current_room:''
    }
    componentDidMount(){
        const socket=openSocket('http://localhost:4000/');
        socket.on('connect',function(){
            console.log('connected');
        });
        this.setState({
            socket
        })
        socket.on('welcome',function(data){
            console.log(data)
        });
        socket.on('create_room',(room)=>{
            console.log('create_room')
            var rooms=[...this.state.rooms,room]
        this.setState({
            rooms
        });
        })


    }
    
    handleJoin=()=>{
        this.setState({
            join:true,
            create:false
        });
        
    
    }

    handleCreate=()=>{
        this.setState({
            create:true,
            join:false
        })
        
    }

    handleRoomName=(e)=>{
        
        if(e.target.value !==''){
            this.setState({
            [e.target.id]:e.target.value
        })}
        console.log(this.state.newroom)
    }

    handleRoomCreation=(e)=>{
        e.preventDefault();
        var newRoomName=this.state.newroom;
      var  roomid=Math.random();
      var room={name:newRoomName,id:roomid}
        
        this.state.socket.emit('room_created',room);
        
        console.log(this.state.rooms)
        this.setState({
            newroom:''
        })

    }
    gotoRoom=(room)=>{
        const socket=this.state.socket;
        console.log(room);
        
        socket.emit('joinRoom',room);
        socket.on('roomJoined',function(data){
            console.log(data);
           
        });
            this.setState({
                room_joined:true,
                current_room:room
            })
            
            this.props.selectRoom(room,this.state.socket)
        
        console.log(this.state.room_joined,this.state.current_room);
    }
  render() {
    let list;
    if(this.state.join){
        list=this.state.rooms.map(room=>{
            return(
                <div className="collection with-header" key={room.id}>
                    <div className="collection-header" >
                    <NavLink to ="/chatroom"><p onClick={()=>this.gotoRoom(room.name)} style={{fontSize:30}}>{room.name}</p>  
                    </NavLink>
                    </div>
                </div>
            )
        });
    }
    else{
        list=''
    }

    let createroom;
    if(this.state.create){

        createroom=
        <div>
        <form onSubmit={this.handleRoomCreation}>
            <input id="newroom" onChange={this.handleRoomName} value={this.state.newroom}/>
            <button className="btn" > Submit </button>
        </form>
        </div>

    
    }
    let  go_there;
    if(this.state.room_joined){
        
        go_there=
        <div>

        <BrowserRouter>
        
        <Route exact path="/chatroom" render={(props)=><Chatroom {...props} room={this.state.current_room}/>} />
        
        </BrowserRouter>
        </div>

    }

    return (
      <div className="container">
        <h2> Welcome {this.props.username}</h2>
        <h4> Join existing or create new room??</h4>

        <button className='btn' onClick={this.handleJoin}>Join</button>   <button className="btn" onClick={this.handleCreate}> Create</button>
        {list}
        {createroom}
        
      </div>
    )
  }
}
