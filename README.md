# rest-doc
Render some docs for a REST API using react

[![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg)][stability]
[![Build Status](https://circleci.com/gh/orangemug/rest-doc.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/rest-doc.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/rest-doc/dev-status.svg)][dm-dev]

[stability]:   https://github.com/orangemug/stability-badges#work-in-progress
[circleci]:    https://circleci.com/gh/orangemug/rest-doc
[dm-prod]:     https://david-dm.org/orangemug/rest-doc
[dm-dev]:      https://david-dm.org/orangemug/rest-doc#info=devDependencies



## Install
To install

```sh
npm install orangemug/rest-doc
```


## Usage
Define a definition of the rest API. There aren't any docs for this yet but you can see an example in [orangemug/futurama-api](https://github.com/orangemug/futurama-api)

```js
var RestDoc = require("rest-doc");
var element = React.createElement(RestDoc, apiDef);
```


## License
[MIT](LICENSE)

