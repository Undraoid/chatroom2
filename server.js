const express = require("express");
const socket = require("socket.io");
const app = express();


const server = app.listen(80, () => {
    console.log("listening to request on port 4000");
})

app.get("/register",(req,res,next) => {
    res.sendFile(__dirname + "/chatpage/register.html");
})

app.use(express.static("chatpage"));

const io = socket(server);

io.on("connection", (socket) => {
    console.log(`made the connection`);
    
    socket.on('chat', (data) => {
        console.log("user sent message");
        io.emit('chat',data);
    })

    socket.on("add_user", user => {
        console.log("user logged");
        io.emit("add_user",user);
    })

})

io.on('disconnect', (socket) => {

    socket.on("unsubscribe", person => {
        io.emit("unsubscribe", person);
    })

   });
