var hapi = require("hapi");
var seneca = require("seneca")();
var blipp = require("blipp");
var handlebars = require("handlebars");
var sass = require("hapi-sass");
var vision = require("vision");
var config = require("config");

var server = new hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

var routes = require("./routes");

server.connection({
  host: config.get("app.host"),
  port: config.get("app.port")
});


if (!module.parent) {
  server.register(blipp, function(error) {
    if (error) {
      console.log("Failed loading blipp plugin");
    }

    server.register({
      register: sass,
      options: {
        debug: true,
        force: true,
        src: "./public/stylesheets",
        outputStyle: "compressed",
        sourceComments: "normal",
        dest: "./public/stylesheets",
        routePath: "/public/stylesheets/{file}.css"
      }
    }, function(error){
      if(error){
        console.log(error);
        return;
      }
    });

    server.route(routes);

    server.register({
      register: vision
    }, function(error){
      if(error){
        console.log(error);
        return;
      }
    });

    /*server.views({
      engines: {
        html: handlebars
      },
      layout: true,
      relativeTo: __dirname,
      path: "./templates",
      layoutPath: "./templates",
      partialsPath: "./templates/partials",
      helpersPath: "./templates/helpers"
    });*/

    server.start(function() {
      console.log("Server running at:", server.info.uri);
    });
  });
}

module.exports = server;