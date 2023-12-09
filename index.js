import express from 'express';
import http from 'node:http';
import { createBareServer } from "@tomphttp/bare-server-node";
import cors from 'cors';
import path from 'node:path';
import axios from 'axios';
/////////////////////////////

const server = http.createServer();
const __dirname = process.cwd();
const app = express(server);
const bareServer = createBareServer('/b/');
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

const routes = [
    { path: '/', file: 'index.html' },
    { path: '/practicing', file: 'practicing.html' },
    { path: '/worksheets', file: 'worksheets.html' },
    { path: '/settings', file: 'settings.html' },
    { path: '/go', file: 'go.html' },
  ];

  app.post('/ss/', (req, res) => {
    const dataFromClient = req.body.data;
    console.log('Data received from client:', dataFromClient);
    sendMessageToDiscord(dataFromClient);
    res.send('Data received successfully');
  });

  const webhookUrl = 'https://discord.com/api/webhooks/1182918710453882880/UnizJQsnQKwCmZ_zj-Nlt-ixLmdpZigmzSzC1VFYvhEDWv1kQBxI3tkZAfyJ9ecpMy8b';

const sendMessageToDiscord = async (message) => {
  try {
    await axios.post(webhookUrl, {
      content: message,
    });

    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message to Discord:', error.message);
  }
};

  routes.forEach((route) => {
    app.get(route.path, (req, res) => {
      res.sendFile(path.join(__dirname, 'static', route.file));
    });
  });
  

  server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });
  
  server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });
  
  server.on('listening', () => {
    console.log(`Succesfully started Seismetic`);
    console.log(`Running at http://localhost:${PORT}`);
  });
  
  server.listen({
    port: PORT,
  });