//user information
const userData = 
[
    {username: "user1", password: "user1"},
    {username: "user2", password: "user2"},
    {username: "user3", password: "user3"}
]

exports.checkAuthen = function(username,password){
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