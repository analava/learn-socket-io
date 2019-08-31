
const io = require('./index').io;
const {Users} = require('./users');
const users = new Users();
module.exports = function(socket){
	console.log('user connected');
	console.log("Socket Id:" + socket.id);

	socket.on('createMessage', (message,callback) => {
		console.log('createMessage', message);
			const user = users.getUser(socket.id);
			if(user)
			    socket.broadcast.to(user.room).emit('newMessage',message);
			callback('got your message');
	 });
	socket.on('join',(data,callback)=>{
	
		socket.join(data.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, data.name, data.room);
		socket.broadcast.to(data.room).emit('newMessage',`${data.name} joined the room`);
		callback('ok')
	})
	socket.on('disconnect',()=>{
		 console.log('user disconnected')
	  })

	
}

