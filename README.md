# tocgen

An opinionated Table of Contents generator for Github. This allows only one level headings - specified via comments, and supports only heading level 5 for all items. Why? Too much bold text and headings spoil readability for certain type of content.

## Install

`npm install -g tocgen`

## Usage

`tocgen README.md`

## Generating ToC

<!-- START table-of-contents -->
**Table of Contents**

+ Usage
  + [CLI](#cli)
  + [NodeJS API](#nodejs-api)
+ Generating ToC
  + [ToC location](#toc-location)
  + [Hidden headings](#hidden-headings)
  + [Visible headings - Level 5](#visible-headings---level-5)

<!-- END table-of-contents -->

<!-- heading: Usage -->

##### CLI

```sh
tocgen README.md
```

##### NodeJS API

```js
var tocgen = require('tocgen');
tocgen(file).then(function() {
  console.log('success');
});
```

<!-- heading: Generating ToC -->

##### ToC location

You can choose where to place your Table of Contents. The ToC will be placed between START and END. By default it will be the beginning of the file.

```md
  <!-- START table-of-contents -->

  <!-- END table-of-contents -->
```

##### Hidden headings

Generally to specify the category name or group name

```md
  <!-- heading: My Awesome Collection of Points -->
```

##### Visible headings - Level 5

These become the visible headings and will support only level 5 headings (5 hashes `#####`)

```md
  ##### My Awesome Point 1

  Points
```
