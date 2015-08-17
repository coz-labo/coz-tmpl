coz-tmpl
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![Dependency Status][bd_gemnasium_shield_url]][bd_gemnasium_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/coz-repo/coz-tmpl
[bd_travis_url]: http://travis-ci.org/coz-repo/coz-tmpl
[bd_travis_shield_url]: http://img.shields.io/travis/coz-repo/coz-tmpl.svg?style=flat
[bd_license_url]: https://github.com/coz-repo/coz-tmpl/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/coz-repo/coz-tmpl
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/coz-repo/coz-tmpl.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/coz-repo/coz-tmpl.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/coz-repo/coz-tmpl
[bd_gemnasium_shield_url]: https://gemnasium.com/coz-repo/coz-tmpl.svg
[bd_npm_url]: http://www.npmjs.org/package/coz-tmpl
[bd_npm_shield_url]: http://img.shields.io/npm/v/coz-tmpl.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Build-in templates for coz.

<!-- Description End -->



<!-- Sections Start -->
<a name="sections"></a>

Installation
-----

```bash
npm install coz-tmpl --save-dev
```

Usage
-----

### Generating index.js for a Module Directory.

`.indexJsBud(config)` defines a bud for a index.js

```javascript
var cozTmpl = require('coz-tmpl');

module.exports = cozTmpl.indexJsBud({
    dirname: __dirname,
    desc: 'Some node module dir',
    module: 'foo'
});

if (!module.parent) {
    require('coz').render(__filename);
}
```

### Generating nodeunit Test File.

`.nodeunitTestJsBud(config)` defines a bud for nodeunit test file.


```javascript
var cozTmpl = require('coz-tmpl');

module.exports = cozTmpl.nodeunitTestJsBud({
    dest: __dirname,
    src:__dirname + '/../lib/*.js'
});

if (!module.parent) {
    require('coz').render(__filename);
}
```


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/coz-repo/coz-tmpl/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [coz](https://github.com/coz-repo/coz)

<!-- Links End -->
