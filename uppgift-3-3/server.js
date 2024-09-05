const express = require("express")
const server = express()
const cookieParser = require("cookie-parser")

server.use(express.urlencoded())
server.use(express.static("client"))
server.use(cookieParser())

server.get("/cookies", (req, res)=>{
    console.log(req.cookies)
})

server.get("/profile", (req, res)=>{
    if (req.cookies.role == "admin") {
        res.sendFile(__dirname + "/client/admin.html")
    } else {
        res.redirect("back")
    }   
})

server.listen(3000)