import express from 'express';
import ViteExpress from 'vite-express';
import db from './db/db.js';
import friendRoutes from './routes/friendRequests.js';
import userRoutes from './routes/users.js';
import http from 'http';
import { WebSocketServer } from 'ws';
import loginRoutes from './routes/login.js';
const app = express();
/*
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server');
});
const wss = new WebSocketServer({ server });

//ws con
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);
    ws.send('Message received by server');
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});
*/

//db con
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
app.use(userRoutes);
app.use(loginRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
