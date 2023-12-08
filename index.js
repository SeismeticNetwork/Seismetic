import express from 'express';
import http from 'node:http';
import { createBareServer } from "@tomphttp/bare-server-node";
import cors from 'cors';
import path from 'node:path';
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