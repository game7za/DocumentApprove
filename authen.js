const express = require('express');
const { get } = require('mongoose');
const mail = require('./mail');
const db = require("./db");

//Get userdata from database for Authentication
userData = db.userData

//loging status
var currentUser 
var loginStatus

//Approve Status
const resetlog = {user1 : 0 , user2: 0, user3: 0 }
var approvelog = {user1 : 0 , user2: 0, user3: 0 }


function checkAuthen(username,password){
    var user_result = userData.filter(obj => {
        return obj.username == username
    })
    if(user_result.length>0){
        let matchPass = user_result[0].password
        if(matchPass == password)  {
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

//Authen Result
exports.result = function(req,res,next){
    var username = req.body.username
    var password = req.body.password
    var authenResult = checkAuthen(username,password)
    if(authenResult==true){
        currentUser= req.body.username
        console.log("User: " + currentUser)
        loginStatus = 1
        return next()
    }
    else{
        res.redirect("/login")
    }
}

exports.loginStatus = function(req,res,next){
    if(loginStatus == 1){
        return next()
    }
    else{
        res.redirect("/login")
    }
}

//Approval
exports.approve = function(req,res,next){
    var approve = req.body.approve
    if(approve == "true"){
        approvelog[currentUser] = 1
        console.log("Result: Approved")
        console.log(approvelog)
        if(approvelog['user1']==1 & approvelog['user2']==1 & approvelog['user3']==1){
            console.log()
            console.log("All Users has approved. Email will be sent to: napat.s@swiftdynamics.co.th ")
            mail.sendMail();
            approvelog = resetlog
        }
        console.log()
        loginStatus = 0 //logout
        return next()
    }
    else{
        approvelog = approvelog
        console.log("Result: Not Approved")
        loginStatus = 0 //logout
        res.redirect('/login')
    }
}
