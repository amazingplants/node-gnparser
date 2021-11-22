# Global Names Parser for Node.js

This module provides Node.js bindings for [`GNParser`](https://github.com/gnames/gnparser) by the Global Names Project.

## Installation

```
npm install gnparser
```

## Supported architectures

The module currently supports MacOS (ARM64 only) and Linux.

## Usage

### parse(names: string | array, options?: object)

* **names** may be an individual scientific name string or an array of name strings
* **options** is an optional object with either or both of these keys:
  * **`details`**: *boolean* - include additional details (e.g. the individual parsed words of the name). Default is `false`.
  * **`cultivars`**: *boolean* - include cultivars in the normalized and canonical names. Default is `false`, which will add a quality warning if a cultivar is present.
  * **`diaereses`**: *boolean* - preserve diaereses (e.g. `Leptochloöpsis virgata`) in normalized and canonical names (but not stemmed canonical names). Default is `false`: diaereses will be transliterated to their ASCII counterparts using GNParser's default transliterations, e.g. `Leptochlooepsis virgata`.
  * **`removeDiaereses`**: *boolean* - transliterate diaereses to their ASCII counterparts without changing the spelling, e.g. `Leptochloöpsis virgata` → `Leptochloopsis virgata`

The recommended options for parsing botanical names are `{ cultivars: true, diaereses: true }`.


For example:

```
const gnparser = require("gnparser")
const name = "Pardosa moesta Banks, 1892"
const parsed = gnparser.parse(name)
```

`parsed` will be a JavaScript object derived from the JSON output of GNParser.

You may also pass multiple names which will be parsed as a batch:

```
const names = ["Pardosa moesta Banks, 1892", "Parus major L.", "Anthurium 'Ace of Spades'"]
const parsed = gnparser.parse(names)
```

Here, `parsed` will be an array of JavaScript objects.

```
const gnparser = require("gnparser")
const name = "Sarracenia flava 'Maxima'"
const parsed = gnparser.parse(name, { details: true, cultivars: true })
```

The cultivar name will be included in the normalized and canonical names, and the most detailed output from GNParser will be included.

## Versioning

This module's major and minor version number matches that of the [main GNParser Go project](https://github.com/gnames/gnparser), but the patch version differs.
