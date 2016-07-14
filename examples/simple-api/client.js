var React    = require("react");
var ReactDOM = require("react-dom");

var Routing = require("../../");


ReactDOM.render(
  React.createElement(Routing, {
    app: {
      name: "Simple API",
      version: "0.1",
      description: "A simple API to show off react-routing"
    },
    routes: [
      {
        method: "get",
        title: "Status",
        description: "Get the status of the application",
        url: "/status",
        schemas: {
          request: {
            params: {},
            query: {
              properties: {
                from: {
                  description: "Only status updates at or after this time are returned",
                  type: "string"
                },
                to: {
                  description: "Only status updates at or before this time are returned",
                  type: "string"
                }
              },
            },
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        },
        examples: [
          {
            request: {
              url: "/status",
              headers: {},
              body: {}
            },
            response: {
              headers: {
                "Status": "200"
              },
              body: {
                systems: [
                  {
                    database: "ok"
                  }
                ]
              }
            }
          }
        ]
      },
      {
        method: "get",
        title: "Version",
        description: "Get the version of the application",
        url: "/version",
        schemas: {
          request: {
            params: {},
            query: {},
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        }
      },
      {
        method: "post",
        title: "Add repo",
        description: "Add a repo to start watching",
        url: "/repo/:user/:repo",
        schemas: {
          request: {
            params: {},
            query: {},
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        }
      },
      {
        method: "get",
        title: "Retrieve repo",
        description: "Retieve the settings for a watched repo",
        url: "/repo/:user/:repo",
        schemas: {
          request: {
            params: {},
            query: {},
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        }
      },
      {
        method: "put",
        title: "Update repo",
        description: "Update the settings for a watched repo",
        url: "/repo/:user/:repo",
        schemas: {
          request: {
            params: {},
            query: {},
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        }
      },
      {
        method: "delete",
        title: "Remove repo",
        description: "Remove watch on a repo",
        url: "/repo/:user/:repo",
        schemas: {
          request: {
            params: {},
            query: {},
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        }
      },
      {
        method: "get",
        title: "List repos",
        description: "List all watched repos",
        url: "/repo/:user/:repo",
        schemas: {
          request: {
            params: {},
            query: {},
            headers: {},
            body: {}
          },
          response: {
            headers: {},
            body: {}
          }
        }
      }
    ]
  }),
  document.getElementById('root')
);
