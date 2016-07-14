# rest-doc
Render REST documentation from a compatible (and willing) server


The server must conform to the [simple routing spec](#simple-routing-spec)


## Simple routing spec
A really simple routing spec, all available routes should be listed at

    [GET] /api/schema
    200 OK
    X-Rest-Doc-Version: "0.1"
    [
      "/status",
      "/version",
      "/user/:user"
    ]

You should also be able to make a _HEAD_ request to check if the schema docs are available

    [HEAD] /api/schema
    X-Rest-Doc-Version: "0.1"
    200 OK

Note it is assumed that if the header `X-Rest-Doc-Version` exists then this endpoint is supported. Renderer can also use this to support multiple versions of the documentation generator

If not supported it'll just `404` which should be the normal operation of the server

    [HEAD] /api/schema
    404 OK

As all _GET_ requests

A request to any of these resources will respond with the schema for that endpoint

    [GET] /api/schema/user/:user
    [
      {
        method: "post",
        url: "/user/:user",
        title: "Update user",
        description: "Update a users details",
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
        url: "/user/:user",
        title: "Retrieve user",
        description: "Retrieve a users details",
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


## CLI Usage
To start an server that will 

      rest-doc http://orangemug.github.io/rest-doc-example


## Javascript API
Server

    var server = RestDoc.server("http://orangemug.github.io/rest-doc-example");
    server.listen(3000);

Express middleware

    var express = requuire("express");
    var app = express();
    var middleware = RestDoc.middleware("http://orangemug.github.io/rest-doc-example");
    app.use("/api", middleware);
    app.listen(3000);

You can also just use this on the client as a react component

    # TODO

    

## License
[MIT](LICENSE)
