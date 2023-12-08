import express from 'express';
import serveStatic from 'serve-static';
import { promises as fsPromises } from 'fs';
import { createBareServer } from "@tomphttp/bare-server-node";
import http from 'node:http';
import path from 'path';

const PORT = process.env.PORT || 8080;

const app = express();
const bare = createBareServer('/b/');
const server = http.createServer();
const staticMiddleware = serveStatic(path.join('static'));
server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        staticMiddleware(req, res, (err) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(400);
                res.end('400 Bad Request');
            }
        });
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req, socket, head)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.on('listening', () => {
    console.log(`Server started on Port: ${PORT}`);
});

server.listen({ port: PORT });
