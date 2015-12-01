# WVU Pattern Library -- Buttons Utility

[![Build Status](https://travis-ci.org/wvu-patterns/wvu-utilities-buttons.svg?branch=master)](https://travis-ci.org/wvu-patterns/wvu-utilities-buttons)

Use [Bower](http://bower.io/) to install this module.

```bash
$ bower install --save wvu-utilities-buttons
```

## Dependencies

```
"wvu-utilities-variables" : "1.0.0",
"wvu-utilities-typography" : "1.0.0"
```

## SCSS Overridable defaults

```scss
// Button Colors
//==================================================
$wvu-button-base-color: $wvu-link-base-color !default;
$wvu-button-hover-color: $wvu-link-hover-color !default;
```

## Pattern Development

Requires:

* Ruby ~= 2.2.3
* NodeJS >= 4.1.2
* Gulp >= 3.8.11

*RVM is Preferred* but not required

## devDependencies

```
"normalize-scss": "~3.0.3",
"neat" : "1.7.2",
"wvu-utilities-colors" : "1.0.0"
```

#### Installation

```bash
$ git clone https://github.com/wvu-patterns/wvu-utilities-buttons.git
$ cd wvu-utilities-buttons
$ gem install bundler
$ bundle install
$ npm install
$ bower install
```

#### Pattern Testing

* `gulp test` will create a build directory so you can view pattern
* `gulp ci` will run lint test to make sure .scss file is valid
