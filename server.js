
const express = require("express")
let users = require("./users")

const server = express()

// this is middleware that allows express
// to parse JSON request bodies.
server.use(express.json())

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

server.get("/users/:id", (req, res) =>{
    // pull the ID value from the URL
    const id = req.params.id
    // const { id } = req.body
    // find the specific user from our database with the ID
    const user = users.find(u => u.id == id)

    // a user was found with that ID
    if (user) {
        // return the data to the client
        res.json(user)
        // no user was found with that ID
    } else {
        // return an error to the client
        res.status(404).json({ message: "User not found" })
    }

})

server.post("/users", (req, res) =>{
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    }

    // simulate the action of "inserting" to our database
    users.push(newUser)
    // 201 means success and a resource was created
    res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) =>{
    // finds the location of the user we're updating in databaze
   const index = users.findIndex(u => u.id == req.params.id)

    //  update that user's name if a new value is sent in
   if (req.body.name) {
       users[index].name = req.body.name
   }
// return updated user data

   res.json(users[index])
})


server.delete("/users/:id", (req, res) =>{
    // find the specific user from our database with ID
    const user = users.find(u => u.id == req.params.id)

    // if user exists in database
    if (user) {
        users = users.filter(u => u.id != req.params.id)
        res.status(204).end()
    } else {
        // return an error
        res.status(404).json({ message: "user not found" })
    }
})

// start server on localhost at port 8080
const port = 8080
server.listen(port, () =>{
    console.log(`server started at hhtp://localhost:${port}`)
})



