const express = require("express");
const fs = require("fs");

const app = express();

const options = {
  key: fs.readFileSync("./security/cert.key"),
  cert: fs.readFileSync("./security/cert.pem"),
};

// let http = require("http").Server(app);
http = require("https").createServer(options, app);

const port = process.env.PORT || 3000;

let io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.send("this is an secure server");
});

http.listen(port, () => {
  console.log("listening on", port);
});

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("create or join", (room) => {
    console.log("crea or join to room ", room);
    const myRoom = io.sockets.adapter.rooms[room] || { length: 0 };
    const numClients = myRoom.length;
    console.log(room, "has", numClients);

    if (numClients == 0) {
      socket.join(room);
      socket.emit("created", room);
    } else if (numClients == 1) {
      socket.join(room);
      socket.emit("joined", room);
    } else {
      socket.emit("full", room);
    }
  });

  socket.on("ready", (room) => {
    socket.broadcast.to(room).emit("ready");
  });

  socket.on("candidate", (event) => {
    socket.broadcast.to(event.room).emit("candiadate", event);
  });

  socket.on("offer", (event) => {
    socket.broadcast.to(event.room).emit("offer", event.sdp);
  });

  socket.on("answer", (event) => {
    socket.broadcast.to(event.rom).emit("answer", event.sdp);
  });
});
