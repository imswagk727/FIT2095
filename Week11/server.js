let express = require("express");
let path = require("path");

let app = express();
let server = require("http").Server(app);  //Create an instance of Express application

let io = require("socket.io")(server); //Create an instance of Socket.io server
let port = 8080;

app.use("/", express.static(path.join(__dirname, "dist/chatApp")));
io.on("connection", socket => {
    console.log("new connection made from client with ID=" + socket.id);
    socket.on("newMsg", data => {
        io.sockets.emit("msg", { msg: data, timeStamp: getCurrentDate() }); //send a message to all connected sockets/clients
    });
});
server.listen(port, () => {
    console.log("Listening on port " + port);
});
function getCurrentDate() {
    let d = new Date();
    return d.toLocaleString();
}