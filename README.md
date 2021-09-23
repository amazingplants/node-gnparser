# Global Names Parser for Node.js

This module provides Node.js bindings for [`GNParser`](https://github.com/gnames/gnparser).

## Installation

```
npm install gnparser
```

## Supported architectures

The module currently supports MacOS (ARM64 only) and Linux.

## Usage

```
const gnparser = require("gnparser")
const name = "Pardosa moesta Banks, 1892"
const parsed = gnparser.parse(name)
```

`parsed` will be a JavaScript object derived from the JSON output of `gnparser`.

You may also pass multiple names which will be parsed as a batch:

```
const names = ["Pardosa moesta Banks, 1892", "Parus major L.", "Anthurium 'Ace of Spades'"]
const parsed = gnparser.parse(names)
```

Here, `parsed` will be an array of JavaScript objects.

## Versioning

This module's version matches that of the main GNParser Go project.
