var React = require("react");

var version = require("./package.json").version;


var Table = React.createClass({
  render: function() {
    var rows = this.props.rows;
    var data = this.props.data;

    return React.createElement("table", {}, [
      React.createElement("thead", {}, [
        React.createElement("tr", {}, rows.map(function(rowKey) {
          return React.createElement("th", {}, rowKey);
        }))
      ]),
      React.createElement("tbody", {}, data.map(function(item) {
        return React.createElement("tr", {}, 
          rows.map(function(rowKey) {
            return React.createElement("td", {"data-title": rowKey}, item[rowKey])
          })
        )
      }))
    ]);
  }
});

var JsonSchema = React.createClass({
  render: function() {
    if(!this.props.schema) {
      return React.createElement("div", {className: "schema schema--empty"}, "Not required");
    }

    var schema = this.props.schema;
    var schemaKeys = Object.keys(schema);

    if(schemaKeys.length < 1) {
      return React.createElement("div", {className: "schema schema--empty"}, "Not yet defined")
    }
    else if(schemaKeys.length === 1 && schemaKeys[0] === "properties") {
      var props = this.props.schema.properties
      var arrProps = Object.keys(props)
        .map(function(name) {
          var obj = Object.assign({}, props[name], {name: name});

          // HACK: In an enum
          if(obj.enum) {
            obj.description += " ("+obj.enum.join(", ")+")";
          }
          return obj;
        })

      return React.createElement(Table, {className: "schema", data: arrProps, rows: ["name", "type", "description"]});
    }
    else {
      return React.createElement("pre", {className: "schema"}, JSON.stringify(schema, null, 2))
    }
  }
})

var Toc = React.createClass({
  render: function() {
    var tocs = [];

    var groups = this.props.groups;
    var routes = this.props.routes;

    function getRoutes(route) {
      return (
        React.createElement(
          "li",
          {},
          [
            React.createElement(
              "a",
              {href: "#route-"+toSlug(route.title)},
              route.title
            )
          ]
        )
      );
    }

    if(groups) {
      groups.forEach(function(group) {
        var _tocs = routes
          .filter(function(route) {
            return route.group === group.id;
          })
          .map(getRoutes);

        if(_tocs.length > 0) {
          tocs.push(
            React.createElement("li", {}, [
              React.createElement(
                "a",
                {href: "#group-"+toSlug(group.id)},
                group.title
              )
            ]),
            React.createElement("ul", {}, _tocs)
          )
        }
      });
    }
    else {
      var tocs = routes.map(getRoutes);
    }

    return React.createElement(
      "ul",
      {className: "toc"},
      tocs
    );
  }
});

var Schemas = React.createClass({
  render: function() {
    return (
      React.createElement(
        "div",
        {className: "route__schemas"},
        [
          React.createElement(
            "h4",
            {className: "route__schemas__request__title"},
            "Request"
          ),
          React.createElement(
            "div",
            {className: "route__schemas__request"},
            [
              React.createElement(
                "h5",
                {className: "route__schemas__request__title"},
                "Path parameters"
              ),
              React.createElement(
                "div",
                {className: "route__url__schema"},
                React.createElement(JsonSchema, {schema: this.props.request.params})
              ),
              React.createElement(
                "h5",
                {className: "schema__title"},
                "Query parameters"
              ),
              React.createElement(
                "div",
                {className: "route__url__schema"},
                React.createElement(JsonSchema, {
                  schema: this.props.request.query
                })
              ),
              React.createElement(
                "h5",
                {className: "schema__title"},
                "Headers"
              ),
              React.createElement(
                "div",
                {className: "route__url__schema"},
                React.createElement(JsonSchema, {
                  schema: this.props.request.headers
                })
              ),
              React.createElement(
                "h5",
                {className: "schema__title"},
                "Body"
              ),
              React.createElement(
                "div",
                {className: "route__url__schema"},
                React.createElement(JsonSchema, {
                  schema: this.props.request.body
                })
              )
            ]
          ),
          React.createElement(
            "h4",
            {className: "route__schemas__response__title"},
            "Response"
          ),
          React.createElement(
            "div",
            {className: "route__schemas__response"},
            [
              React.createElement(
                "h5",
                {className: "schema__title"},
                "Headers"
              ),
              React.createElement(
                "div",
                {className: "route__url__schema"},
                React.createElement(JsonSchema, {
                  schema: this.props.response.headers
                })
              ),
              React.createElement(
                "h5",
                {className: "schema__title"},
                "Body"
              ),
              React.createElement(
                "div",
                {className: "schema"},
                React.createElement(
                  "div",
                  {className: "route__url__schema"},
                  React.createElement(JsonSchema, {
                    schema: this.props.response.body
                  })
                )
              )
            ]
          )
        ]
      )
    )
  }
});

var Route = React.createClass({
  render: function() {
    console.log(">> props", this.props);
    var schemas = React.createElement(Schemas, this.props.schemas);

    return (
      React.createElement("div", {className: "route"}, [
        React.createElement("div", {className: "route__def"}, [
          React.createElement(
            "h3",
            {className: "route__title"},
            this.props.title
          ),
          React.createElement(
            "p",
            {className: "route__description"},
            this.props.description
          ),
          React.createElement(Url, {method: this.props.method, url: this.props.url}),
          schemas
        ]),
        React.createElement(
          "div",
          {
            className: "route__examples",
          },
          React.createElement("h3", {}, "Examples"),
          React.createElement("p", {}, [
            "Examples: ",
            React.createElement("select", {}, [
              React.createElement("option", {}, "Simple")
            ]),
          ]),
          React.createElement("div", {}, 
            (this.props.examples || []).map(function(example) {
              return React.createElement(HttpReq, example)
            })
          )
        )
      ])
    );
  }
});


var Url = React.createClass({
  render: function() {
    return React.createElement(
      "div",
      {className: "route__url"},
      [
        React.createElement(
          "div",
          {
            className: "route__url__method http-"+this.props.method
          },
          this.props.method
        ),
        React.createElement(
          "div",
          {
            className: "route__url__path"
          },
          this.props.url
        )
      ]
    );
  }
});


var HttpReqReq = React.createClass({
  render: function() {
    var headers = Object.keys(this.props.headers).map(function(key) {
      var str = key+": "+this.props.headers[key];
      return React.createElement("li", {}, str);
    }, this);

    var body;
    if(Object.keys(this.props.body).length < 1) {
      body = React.createElement("pre", {}, "No body")
    }
    else {
      body = React.createElement("pre", {}, JSON.stringify(this.props.body, null, 2))
    }

    return React.createElement("div", {className: this.props.className}, [
      React.createElement("ul", {className: "example__http__header"}, headers),
      React.createElement("div", {className: "example__http__body"}, body)
    ])
  }
})

var HttpReq = React.createClass({
  render: function() {
    return (
      React.createElement("div", {}, [
        // React.createElement("div", {className: "cmd-line"}, "curl -X GET http://example.com/foo/bar"),
        React.createElement("h4", {}, "Request"),
        React.createElement(Url, {method: this.props.method, url: this.props.url}),
        React.createElement(HttpReqReq,
          Object.assign(this.props.request, {
            className: "example__http example__request"
          })
        ),
        React.createElement("h4", {}, "Response"),
        React.createElement(HttpReqReq,
          Object.assign(this.props.response, {
            className: "example__http example__response"
          })
        )
      ])
    );
  }
});

function toSlug(str) {
  return str.toLowerCase().replace(" ", "-");
}

var Routes = React.createClass({
  render: function() {
    var out;
    var routes = this.props.routes;
    var groups = this.props.groups;

    function genRoute(route) {
      return React.createElement("div", {}, [
        React.createElement("a", {
          id: "route-"+toSlug(route.title)
        }),
        React.createElement(Route, route)
      ])
    }

    if(groups) {
      out = [];
      groups.forEach(function(group) {
        var _routes = routes
          .filter(function(route) {
            return route.group === group.id;
          })
          .map(genRoute);

        if(_routes.length > 0) {
          out.push(
            React.createElement("div", {className: "route-group"}, [
              React.createElement("a", {
                className: "route-group__anchor",
                id: "group-"+toSlug(group.id)
              }),
              React.createElement("div", {className: "route-group__title"}, [
                React.createElement("h2", {}, group.title),
                React.createElement("p", {}, group.description)
              ]),
              React.createElement("div", {}, _routes)
            ])
          )
        }
      });
    }
    else {
      out = routes
        .map(genRoute)
    }

    return React.createElement("div", {}, out);

    // Generate the routes
    for(var group in this.props.routes) {
      var groups = this.props.groups;
      if(groups && groups.hasOwnProperty(group)) {
        var el = React.createElement("div", {}, [
          React.createElement("h3", {}, groups[group].title),
          React.createElement("p", {}, groups[group].description)
        ])
        routes.push(el);
      }

      this.props.routes[group].forEach(function(route) {
      });
    }

  }
});


module.exports = React.createClass({
  render: function() {
    var routes = React.createElement(Routes, {
      routes: this.props.routes,
      groups: this.props.groups
    });

    var tocs = React.createElement(Toc, {
      routes: this.props.routes,
      groups: this.props.groups
    });

    return (
      React.createElement("div", {className: "root"}, [
        React.createElement("div", {className: "app"}, [
          React.createElement("div", {className: "app__body"}, [
            React.createElement(
              "h1",
              {className: "app__name"},
              this.props.app.name
            ),
            React.createElement(
              "p",
              {className: "app__description"},
              this.props.app.description
            ),
            tocs,
            React.createElement(
              "div",
              {className: "app__routes"},
              routes
            ),
          ])
        ]),
        React.createElement(
          "footer",
          {className: "app__footer"},
          [
            "Made with ",
            React.createElement("a", {href: "https://github.com/orangemug/rest-doc"}, "rest-doc"),
            " ",
            React.createElement("a", {
              className: "app__footer__version",
              href: "https://github.com/orangemug/rest-doc/tree/v"+version
            }, "v"+version)
          ]
        )
      ])
    )
  }
});
