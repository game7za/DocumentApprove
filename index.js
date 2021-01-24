const express = require("express");
const ejs = require("ejs")
const session = require('express-session')
const PORT = 8000;

//middleware
const app = express();
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))


//log
var currentUser = []
var approvelog = {user1 : 0 , user2: 0, user3: 0 }

//Authentication
const authen = require('./authen');
const { builtinModules } = require("module");
const { response } = require("express");
function authenResult(req,res,next){
    var username = req.body.username
    var password = req.body.password
    var authenResult = authen.checkAuthen(username,password)
    if(authenResult==true){
        currentUser= req.body.username
        approvelog[currentUser] = 1
        console.log(currentUser)
        console.log(approvelog)
        return next()
    }
    else{
        res.redirect("/login")
    }
}

//Approval
function approveResult(req,res,next){
    var approve = req.getElementById("approve").submit()
    if(approve == true){
        approvelog[currentUser] = 1
        console.log(approvelog)
        return next()
    }
    else{
        approvelog = approvelog
        console.log("Not Approved")
        res.redirect('/login')
    }
}

//route
app.get("/login",function(req,res){    //login
    res.render('index.ejs')
})

app.get("/",authenResult,function(req,res){    //to enter home require login
})

app.post("/",authenResult,function(req,res){    //to enter home require login
    res.redirect("/doc")
})

app.get("/doc",function(req,res){
    res.render("doc.ejs")
})

app.post("/doc",approveResult,function(req,res){
})

app.listen(PORT, console.log('Listen on Port:8000'))
