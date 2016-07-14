var React = require("react");
var FixedDataTable = require("fixed-data-table");


var JsonSchema = React.createClass({
  render: function() {
    var MyCell = function(opts) {
      console.log(opts);
      return React.createElement(FixedDataTable.Cell, {}, 
        opts.data[opts.rowIndex][opts.col]
      )
    }

    var dataList = [
      {avartar: "foo"},
      {avartar: "bar"},
      {avartar: "baz"}
    ]

    return React.createElement(FixedDataTable.Table, {
      rowHeight: 50,
      headerHeight: 50,
      rowsCount: dataList.length,
      width: 1000,
      height: 100,
    }, [
      React.createElement(FixedDataTable.Column, {
        cell: React.createElement(FixedDataTable.Cell, {}, "Hello"),
        fixed: true,
        width: 50
      })
    ])

    // return React.createElement("table", {}, [
    //   React.createElement("tbody", {}, [
    //     React.createElement("tr", {}, [
    //       React.createElement("td", {}, [
    //       ])
    //     ])
    //   ])
    // ]);
  }
});

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
              {href: "#"},
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
                {className: "schema__title"},
                "Query parameters"
              ),
              React.createElement(
                "div",
                {className: "schema"},
                JSON.stringify(this.props.request.query)
              ),
              React.createElement(
                "h4",
                {className: "schema__title"},
                "Headers"
              ),
              React.createElement(
                "div",
                {className: "schema"},
                JSON.stringify(this.props.request.headers)
              ),
              React.createElement(
                "h4",
                {className: "schema__title"},
                "Body"
              ),
              React.createElement(
                "div",
                {className: "schema"},
                JSON.stringify(this.props.request.body)
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
                {className: "schema"},
                JSON.stringify(this.props.request.headers)
              ),
              React.createElement(
                "h4",
                {className: "schema__title"},
                "Body"
              ),
              React.createElement(
                "div",
                {className: "schema"},
                JSON.stringify(this.props.request.body)
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
            // React.createElement(
            //   "div",
            //   {className: "route__url__schema"},
            //   JSON.stringify(this.props.schemas.request.params)
            // )
          ]
        ),
        schemas
      ])
    );
  }
});


module.exports = React.createClass({
  render: function() {
    // Generate the routes
    var routes = this.props.routes.map(function(route) {
      return React.createElement(Route, route);
    });

    var tocs = React.createElement(Toc, {items: this.props.routes});

    return (
      React.createElement("div", {}, [
        // React.createElement(JsonSchema, {}, []),
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
          "rest-doc"
        )
      ])
    );
  }
});
