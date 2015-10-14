var seneca = require("seneca")();
var config = require("config");

seneca
  .use("mongo-store", config.get("mongodb"));

module.exports = function user(options) {

  this.add("role:users,cmd:list", function create(msg, respond) {

    var user = seneca.make$("user");
    user.list$({}, function (error, users) {
      if (error) {
        throw error;
      }
      
      respond(null, {
        answer: users
      })
    });

  });

  this.add("role:users,cmd:detail", function create(msg, respond) {

    var user = seneca.make$("user");
    user.load$({id: msg.id}, function (error, existingUser) {
      if (error) {
        throw error;
      }

      delete existingUser.password;

      respond(null, {
        answer: existingUser
      })
    })

  });

  this.add("role:users,cmd:create", function create(msg, respond) {
  
    var user = seneca.make$("user");
    user.email = msg.data.email;
    user.password = bcrypt.hashSync(msg.data.email);
    user.save$(function(error, newUser){
      if (error) {
        throw error;
      }

      delete newUser.password;
      
      respond(null, {
        answer: newUser
      })
    })
    
  });

  this.add("role:users,cmd:update", function create(msg, respond) {

    var user = seneca.make$("user");
    user.load$({id: msg.id}, function (error, existingUser) {
      if (error) {
        throw error;
      }

      Object.keys(msg.data).forEach(function(key) {
        if (key === "password") {
          existingUser[key] = bcrypt.hashSync(msg.data[key]);
        } else {
          existingUser[key] = msg.data[key];
        }
      });

      existingUser.save$(function(error, updatedUser){
        if (error) {
          throw error;
        }

        delete updatedUser.password;

        respond(null, {
          answer: updatedUser
        })
      });
      
    });
    
  });

  this.add("role:users,cmd:delete", function create(msg, respond) {

    var user = seneca.make$("user");
    user.remove$({id: msg.id}, function (error, deletedUser) {
      if (error) {
        throw error;
      }
      
      delete deletedUser.password;

      respond(null, {
        answer: deletedUser
      })
    })

  });

};