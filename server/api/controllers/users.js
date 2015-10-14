var seneca = require("seneca")();
var config = require("config");
var controller = {};
var clientConfig = config.get("apps.user");

module.exports = (function() {
  return controller;
}());

controller.list = function(request, reply) {
  seneca
    .client(clientConfig)
    .act({
      role: "users",
      cmd: "list"
    }, {
      id: request.params.id
    },function (error, result) {
      if (error) {
        return reply(error);
      }
      return reply(result);
    });
};

controller.detail = function(request, reply) {
  seneca
    .client(clientConfig)
    .act({
      role: "users",
      cmd: "detail"
    }, {
      id: request.params.id
    },function (error, result) {
      if (error) {
        return reply(error);
      }
      return reply(result);
    });
};

controller.create = function(request, reply) {
  seneca
    .client(clientConfig)
    .act({
      role: "users",
      cmd: "create"
    }, {
      data: request.payload
    },function (error, result) {
      if (error) {
        return reply(error);
      }
      return reply(result);
    });
};

controller.update = function(request, reply) {
  seneca
    .client(clientConfig)
    .act({
      role: "users",
      cmd: "update"
    }, {
      id: request.params.id,
      data: request.payload
    },function (error, result) {
      if (error) {
        return reply(error);
      }
      return reply(result);
    });
};

controller.delete = function(request, reply) {
  seneca
    .client(clientConfig)
    .act({
      role: "users",
      cmd: "delete"
    }, {
      id: request.params.id
    },function (error, result) {
      if (error) {
        return reply(error);
      }
      return reply(result);
    });
};