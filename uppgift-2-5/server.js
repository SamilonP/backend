const express = require("express")
const server = express()

const fs = require("fs")

server.use(express.static("client"))
server.use(express.urlencoded())

server.post("/login", (req, res)=>{
    fs.readFile("data.txt", (err, data)=>{
        if (err) {
            throw err
        }

        data = JSON.parse(data)
        if (data.username == req.body.username && data.password == req.body.password) {
            console.log(data.username)
            res.sendFile(__dirname + "/client/home.html")
        } else {
            res.send("The username or password is wrong!")
        }
    })
})

server.post("/signup", (req, res)=>{
    fs.writeFileSync("data.txt", JSON.stringify(req.body))
    res.sendFile(__dirname + "/client/index.html")
})

server.listen(3000)