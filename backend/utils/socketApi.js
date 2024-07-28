import {io} from '../app.js'
import Message from '../models/message.js'

export const socketMessage=()=>{
io.on("connection",(socket)=>{
    socket.on('join', ({ userId }) => {
        socket.join(userId);
    });
    socket.on("message-sent",async(data)=>{
        const {senderId,revicerId,message}=data;
        const newMsg = Message.create({senderId,revicerId,data:message})
        await newMsg.save();
        io.to(receiverId).emit('chat message', data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})
}