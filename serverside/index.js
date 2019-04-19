const express=require('express');
const socket=require('socket.io');

var app=express();


const server=app.listen(4000,function(){
    console.log('listening to port 4000');
})
var currentroom;
app.get('/',(req,res)=>{
    res.send('here it is ')
})
const io=socket(server);

 
io.on('connection',function(socket){
    var clients=io.sockets.clients().connected;
    console.log(Object.values(clients).length)
    console.log('socket connected successfully',socket.id);
    io.emit('welcome','welcome user, to this new experience');
    socket.on('joinRoom',function(room){
        console.log(room)
        socket.join(room)
        currentroom=room;
        socket.to(room).emit('roomJoined',currentroom);
    });
    socket.on('msg_sent',({room,message})=>{
        console.log(message);
        socket.to(room).emit('display_msg',message)
    })
    

})