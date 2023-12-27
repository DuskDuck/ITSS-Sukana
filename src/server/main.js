import express from 'express';
import ViteExpress from 'vite-express';
import http from 'http';

import db from './db/db.js';
import friendRoutes from './routes/friendRequests.js';
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chat.js'
import loginRoutes from './routes/login.js';
import { Server } from 'socket.io'; // Import Socket.io
import cors from 'cors';
const app = express();
const server = http.createServer(app);

//Integrate Socket.io with the server
const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

// db connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL");
    connection.release();
  }
});

app.use(express.json());
app.use(friendRoutes);
app.use(loginRoutes);
app.use(chatRoutes);
app.use(userRoutes);
app.use(cors());

// socket connection
let connectedClients = 0;

io.on('connection', (socket) => {
  connectedClients++; 
  console.log(  '[+] a user connected (' + connectedClients +')   - UserID:' + socket.id);
  socket.on('disconnect', () => {
    connectedClients--;
    console.log('[X] a user disconnected (' + connectedClients +')- UserID:' + socket.id);
  });

  // Other event listeners and handlers for real-time communication
  socket.on('your chat message', (msg, time, id) => {
    console.log(id + ' message: ' + msg + ' ' + time);
    io.emit('messageRespone', msg, time, id);
  });

});

io.listen(3010);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
