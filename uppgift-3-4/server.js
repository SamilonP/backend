const express = require("express")
const cookieParse = require("cookie-parser")
const server = express()

server.use(express.urlencoded())
server.use(cookieParse())
server.use(express.static("client"))

server.get("/highscore", (req, res)=>{
    res.sendFile(__dirname + "/client/highscores.html")
})

server.listen(3000)