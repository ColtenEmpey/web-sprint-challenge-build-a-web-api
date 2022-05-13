const express = require('express');
const server = express();
const projectsRoute = require("./projects/projects-router")
const actionsRoute = require("./actions/actions-router")

server.get("/", (req,res)=>{
    res.send("hello from the server")
})
server.use(express.json())
server.use("/api/projects", projectsRoute)
server.use("/api/actions", actionsRoute)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
