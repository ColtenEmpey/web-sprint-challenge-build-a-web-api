const server = require("./api/server")

port = process.env.PORT || 6000
//TODO fix this port somehow. it needs to be 9000 but its already in use

server.listen(port, ()=>{
    console.log("ITS WORKING!")
})