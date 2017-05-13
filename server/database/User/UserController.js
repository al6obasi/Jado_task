var utils=require('../../config/utils.js');
var jwt = require('jwt-simple');
var User = require('./UserModel.js');

module.exports = {
  signin: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.find({username:username},function(err,data){
      if(err){
        res.json(err)
      }
      else{
        
        if(data.length===0){
          res.json("Wrong username !!")
        }
        else{
          utils.comparePass(password,data[0].password,function(ok){
            if(ok){
              var token=jwt.encode(data[0],'user');
              res.json({token:token, id:data[0]._id})
            }
            else{
              res.json("Wrong password !!!")
            }
          })
        
        }
      }
    })
  },
  signup: function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var email=req.body.email;
    var date=new Date().toUTCString().substr(0,16);
     utils.hashpass(password,function(hash){
             password=hash});
   
     User.find({username:username},function(err,data){
      if(err){
        res.json(err)
      }
      else{
        if(data.length ===0 ){
            User.find({email:email},function(err,data){
              if(err){
                res.json(err)
              }
              else{
                if(data.length===0){
                  User.create({username:username,password:password,email:email,date:date},function(err,data){
            if(err){
              res.json(err)
            }
            else{
              res.json("Ok")
            }
          })
                }
                else{
                  res.json("email already exist")
                }
              }
            })
        }else{
          res.json("user already exist")
        }
      }
     })
    // check to see if user already exists
   
  },
 
};


              


 