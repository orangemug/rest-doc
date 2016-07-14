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


## Simple changelog spec
Give your API a changelog follows the format at <http://keepachangelog.com/>

This allows APIs to publish patches and tell everyone about them in a really easy to understand way

    [GET] /api/changelog
    200 OK
    {
      "note": "All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).",
      "changes": [
        {
          version: "0.3.1",
          timestamp: "2014-02-27T15:05:06+01:00",
          details: {
            added: [
              "Fixed character encoding"
            ]
          }
        }
      ]
    }

It is also expected that the API server responds with a version header on response

    X-Simple-API-Version: 0.3.1

This helps in the following sceneario

 1. User of you app reports a bug
 2. You test and it seems to be resolved
 3. You check the logs the request which caused the problem and notice a `X-Simple-API-Version: 0.3.1`
 4. You notice the current version of the API is `X-Simple-API-Version: 0.3.2`
 5. You look at the changelog and it appears that this could have resolved the issue
 6. You feel happy and confident it's no longer an issue :)


## Simple status spec
Status of an app and its services

    [GET] /api/status
    200 OK
    {
      status: [
        {
          id: "app",
          name: "Application"
          status: "ok"
        } 
      ],
      services: [
        "http://search.sequor.io"
      ]
    }


## CLI Usage
To start a server

    rest-doc-server http://orangemug.github.io/rest-doc-example

Or to just list the docs

    rest-doc http://orangemug.github.io/rest-doc-example
    /users/:username
    /status

    rest-doc http://orangemug.github.io/rest-doc-example /users/:username
    [GET]  /users/:username - Get user
    [POST] /users/:username - Update user

    rest-doc http://orangemug.github.io/rest-doc-example /users/:username GET
    [GET] /users/:username - Get user

    Get the details of a user

    ## Params

    `:username` the username of a user in the system

     - type: "string"
        

    ## Body
    
        {
          id: 1,
          username: "orangemug"
        }
      
      


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



## Ideas
Given we have schemas and examples we should be able to create a lightweight mocking server from the API docs

    rest-doc-mock http://orangemug.github.io/rest-doc-example

This will only support `GET` requests. Although later it could be possible to transform the data based on operations (`PUT` / `DELETE` / `POST`)

**NOTE:** Look at operational transforms (OT)







    

## License
[MIT](LICENSE)
