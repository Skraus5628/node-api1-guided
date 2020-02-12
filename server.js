
const express = require("express")
const users = require("./users")

const server = express()

server.get("/", (req, res) =>{
    res.json({ message: "hello, world "})
})

server.get("/lambda", (req, res) =>{
    // automatically return all the required response headers
    // and status code for a proper http redirect
    res.redirect("https://lambdaschool.com") 
})


server.get("/users", (req,res) =>{
    // return users array, this is simulating a real database call
    res.json(users)
})


const port = 8080
server.listen(port, () =>{
    console.log(`server started at hhtp://localhost:${port}`)
})



