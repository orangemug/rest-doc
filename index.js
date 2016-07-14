var React = require("react");
var FixedDataTable = require("fixed-data-table");

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
      return React.createElement("div", {className: "schema schema--empty"}, "");
    }

    var schema = this.props.schema;
    var schemaKeys = Object.keys(schema);

    if(schemaKeys.length < 1) {
      return React.createElement("div", {className: "schema schema--empty"}, "Not yet defined")
    }
    else if(schemaKeys.length === 1 && schemaKeys[0] === "properties") {
      var props = this.props.schema.properties
      var arrProps = Object.keys(props).map(function(name) {
        return Object.assign(props[name], {name: name}) 
      })
      return React.createElement(Table, {className: "schema", data: arrProps, rows: ["name", "type", "description"]});
    }
    else {
      return React.createElement("div", {className: "schema"}, JSON.stringify(schema))
    }
  }
})

var Toc = React.createClass({
  render: function() {
    var tocs = this.props.items.map(function(item) {
      return (
        React.createElement(
          "li",
          {},
          [
            React.createElement(
              "a",
              {href: "#"+toSlug(item.title)},
              item.title
            )
          ]
        )
      )
    })

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
            "h3",
            {className: "route__schemas__request__title"},
            "Request"
          ),
          React.createElement(
            "div",
            {className: "route__schemas__request"},
            [
              React.createElement(
                "h4",
                {className: "route__schemas__request__title"},
                "Path parameters"
              ),
              React.createElement(
                "div",
                {className: "route__url__schema"},
                React.createElement(JsonSchema, {schema: this.props.request.params})
              ),
              React.createElement(
                "h4",
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
                "h4",
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
                "h4",
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
            "h3",
            {className: "route__schemas__response__title"},
            "Response"
          ),
          React.createElement(
            "div",
            {className: "route__schemas__response"},
            [
              React.createElement(
                "h4",
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
                "h4",
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
        React.createElement(
          "h2",
          {className: "route__title"},
          this.props.title
        ),
        React.createElement(
          "p",
          {className: "route__description"},
          this.props.description
        ),
        React.createElement(
          "div",
          {className: "route__url"},
          [
            React.createElement(
              "div",
              {
                className: "route__url__method http-"+this.props.method,
              },
              this.props.method
            ),
            React.createElement(
              "div",
              {
                className: "route__url__path",
              },
              this.props.url
            ),
          ]
        ),
        schemas
      ])
    );
  }
});


function toSlug(str) {
  return str.toLowerCase().replace(" ", "-");
}


module.exports = React.createClass({
  render: function() {
    // Generate the routes
    var routes = this.props.routes.map(function(route) {
      return React.createElement("div", {}, [
        React.createElement("a", {
          id: toSlug(route.title)
        }),
        React.createElement(Route, route)
      ])
    });

    var tocs = React.createElement(Toc, {items: this.props.routes});

    var rows = ["name", "type", "description"];
    var data = [
      {
        name: "filter",
        type: "string",
        description: "Indicates which sorts of issues to return."
      },
      {
        name: "state",
        type: "string",
        description: "Indicates the state of the issues to return."
      }
    ]

    return (
      React.createElement("div", {}, [
        React.createElement("div", {className: "app__body"}, [
          React.createElement(
            "h1",
            {className: "app__name"},
            this.props.app.name
          ),
          // React.createElement(
          //   "div",
          //   {className: "app__version"},
          //   this.props.app.version
          // ),
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
        ]),
        React.createElement(
          "footer",
          {className: "app__footer"},
          [
            React.createElement("a", {href: "https://github.com/orangemug/rest-doc"}, "rest-doc"),
            "@",
            React.createElement("a", {href: "https://github.com/orangemug/rest-doc/tree/v"+version}, "v"+version)
          ]
        )
      ])
    );
  }
});
