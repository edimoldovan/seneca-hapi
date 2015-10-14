var joi = require("joi");
var controller = require("../controllers/users");

module.exports = [
  {
    method: "GET",
    path: "/api/users",
    config: {
      description: "Get user list"
    },
    handler: controller.list.bind(controller)
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    config: {
      description: "Get user detail",
      validate: {
        params: {
          id: joi.string().description("The id of the user we want to retrieve")
        }
      }
    },
    handler: controller.detail.bind(controller)
  },
  {
    method: "POST",
    path: "/api/users",
    config: {
      description: "Create one user",
      validate: {
        payload: {
          email: joi.string().description("The user email"),
          name: joi.string().description("The user name"),
          password: joi.string().description("The user password")
        }
      }
    },
    handler: controller.create.bind(controller)
  },
  {
    method: "PUT",
    path: "/api/users/{id}",
    config: {
      description: "Update one user",
      validate: {
        params: {
          id: joi.string().description("The id of the user we want to update")
        },
        payload: {
          email: joi.string().description("The user email"),
          name: joi.string().description("The user name"),
          password: joi.string().description("The user password")
        }
      }
    },
    handler: controller.update.bind(controller)
  },
  {
    method: "DELETE",
    path: "/api/users/{id}",
    config: {
      description: "Delete one user",
      validate: {
        params: {
          id: joi.string().description("The id of the user we want to update")
        }
      }
    },
    handler: controller.delete.bind(controller)
  }
];