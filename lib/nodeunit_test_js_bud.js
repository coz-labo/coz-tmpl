/**
 * Bud for nodeunit test.
 * @memberof module:coz-tmpl/lib
 * @function nodeunitTestJsBud
 * @param {object} config - Nodeunit testcase configuration.
 * @param {string|string[]} config.src - Source file name pattern.
 * @param {string} [config.dest] - Destination directory path.
 * @returns {module:coz-bud/lib~Bud} - Bud for nodeunit testcase.
 */

"use strict";

var glob = require('glob'),
    path = require('path'),
    assert = require('assert'),
    cozBud = require('coz-bud'),
    _tmpl = require('./_tmpl');

/** @lends nodeunitTestJsBud */
function nodeunitTestJsBud(config) {
    var src = config.src,
        dest = config.dest || process.cwd();
    assert.ok(!!src, 'config.src is required.');
    return [].concat(src)
        .map(function (src) {
            return glob.sync(path.resolve(src));
        })
        .reduce(function (result, cur) {
            return result.concat(cur);
        }, [])
        .filter(function (src) {
            return path.basename(src) !== 'index.js';
        })
        .filter(function (src) {
            return !/^[\._\-]/.test(path.basename(src));
        })
        .filter(function (src) {
            try {
                require.resolve(src);
                return true;
            } catch (e) {
                return false;
            }
        })
        .map(function (src) {
            var basename = path.basename(src, path.extname(src));
            return cozBud({
                force: false,
                mode: '644',
                mkdirp: false,
                tmpl: _tmpl('nodeunit_test.js.hbs'),
                path: path.resolve(dest, basename + '_test.js'),
                data: {
                    name: basename,
                    relative: path.relative(dest, src)
                }
            })
        });
}

module.exports = nodeunitTestJsBud;