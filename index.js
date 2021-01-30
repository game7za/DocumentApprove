//Package
const express = require("express");
const ejs = require("ejs")
const session = require('express-session')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = 8080;

//middleware
const app = express();
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());

//MongoDB
const db = require("./db")

//Authentication
const authen = require('./authen');
var authenResult = authen.result
var loginStatus =  authen.loginStatus
var approveResult = authen.approve

//route
app.get("/login",function(req,res){    //login
    res.render('index.ejs')
})

app.get("/",authenResult,function(req,res){    //to enter home require login
})

app.post("/",authenResult,function(req,res){    //to enter home require login
    res.redirect("/doc")
})

app.get("/doc",loginStatus,function(req,res){
    res.render("doc.ejs")
})

app.post("/doc",approveResult,function(req,res){
    res.redirect("/login")
})

app.listen(PORT, console.log('Listen on Port:8080'))

