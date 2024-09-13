const express = require("express")
const cookieParse = require("cookie-parser")
const server = express()
const fs = require("fs")

server.use(express.urlencoded())
server.use(express.json())
server.use(cookieParse())
server.use(express.static("client"))

server.post("/highscore", (req, res)=>{
    let savedScore = JSON.parse(fs.readFileSync("highscore.json", {encoding: "utf-8"}))
    if (savedScore.score > req.body.score) {
        fs.writeFileSync("highscore.json", JSON.stringify(req.body))
        res.json({msg: "highscore saved"})
    } else {
        res.json({msg: savedScore.score})
    }
})

server.get("/highscore", (req, res)=>{
    let savedScore = fs.readFileSync("highscore.json", {encoding: "utf-8"})
    res.send(savedScore)
})

server.listen(3000)