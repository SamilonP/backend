const express = require("express")
const server = express()
const cookieParser = require("cookie-parser")

server.use(cookieParser())
server.use(express.static("client"))
server.use(express.urlencoded())

server.get("/cookies", (req, res)=>{
    console.log(req.cookies)
})

server.listen(3000)