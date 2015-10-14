var seneca = require("seneca")();
var config = require("config");

seneca
  .use("user-controller")
  .listen({
    port: config.get("app.port")
  });