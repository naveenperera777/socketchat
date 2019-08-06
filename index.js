const express = require("express");
const port = 7007;
const app = express();
const socket = require("socket.io");

app.use(express.static("public"));

const server = app.listen(port, function() {
  console.log("Listening on " + port);
});

const io = socket(server);

io.on("connection", function(socket) {
  console.log("Made socket connection ", socket.id);

  socket.on("chat", function(data) {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
