var React    = require("react");
var ReactDOM = require("react-dom");

var Routing = require("../../");

var apiDef = {
  app: {
    name: "Simple API",
    version: "0.1",
    description: "A simple API to show off react-routing"
  },
  groups: {
    misc: {
      title: "Miscellaneous",
      description: "This is a miscellaneous set of APIs"
    },
    repo: {
      title: "Repositories"
    }
  },
  routes: [
    {
      method: "get",
      group: "misc",
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
      group: "misc",
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
      group: "repo",
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
      group: "repo",
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
      group: "repo",
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
      group: "repo",
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
      group: "repo",
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
}


var newRoutes = {};
apiDef.routes.forEach(function(route) {
  var group;
  if(route.group) {
    group = route.group;
  }
  else {
    group = "misc";
  }

  newRoutes[group] = newRoutes[group] || [];
  newRoutes[group].push(route);
});

apiDef.routes = newRoutes;

ReactDOM.render(
  React.createElement(Routing, apiDef),
  document.getElementById('root')
);
