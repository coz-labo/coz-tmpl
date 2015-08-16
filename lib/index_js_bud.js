/**
 * Bud for index.js
 * @memberof module:coz-tmpl/lib
 * @function indexJsBud
 * @param {object} config - Index js configuration.
 * @param {string} config.dirname - Directory name.
 * @param {string} [config.desc] - Module description.
 * @param {string} [config.module] - Module annotation.
 * @param {string} [config.parentmodule] - Name of parent module.
 * @param {string[]} [config.submodules] - Name of members as submodule.
 * @param {string[]} [config.subclasses] - Name of members as subclasses
 * @returns {module:coz-bud/lib~Bud} - Bud for index.js
 */

"use strict";

var EOL = require('os').EOL,
    stringSort = require('./string_sort'),
    arrayfilter = require('arrayfilter'),
    stringcase = require('stringcase'),
    async = require('async'),
    cozBud = require('coz-bud'),
    assert = require('assert'),
    path = require('path'),
    fs = require('fs');

/** @lends indexJsBud */
function indexJsBud(config) {
    var dirname = config.dirname;
    assert.ok(!!dirname, 'config.dirname is required.');
    return cozBud({
        force: true,
        mode: '444',
        path: path.resolve(dirname, 'index.js'),
        mkdirp: false,
        tmpl: 'indexjs',
        data: {
            END_BRACE: '}',
            desc: [].concat(config.desc || []).join(EOL + ' * '),
            module: config.module,
            parentmodule: [].concat(config.parentmodule || []),
            get modules() {
                var submodules = [].concat(config.submodules || []),
                    subclasses = [].concat(config.subclasses || []);
                return fs.readdirSync(dirname)
                    .sort(stringSort())
                    .filter(arrayfilter.patternReject(/^[\._]/))
                    .filter(arrayfilter.patternReject(/^index\.js$/))
                    .filter(function (filename) {
                        try {
                            require.resolve(path.resolve(dirname, filename));
                            return true;
                        } catch (e) {
                            return false;
                        }
                    })
                    .map(function (filename) {
                        try {
                            var name = path.basename(filename, path.extname(filename));
                            return {
                                name: name,
                                requireName: name.split(/\./g).map(stringcase.snakecase).join('.'),
                                isSubmodules: ~submodules.indexOf(stringcase.camelcase(name)),
                                isSubclass: ~subclasses.indexOf(stringcase.camelcase(name)) || ~subclasses.indexOf(stringcase.pascalcase(name))
                            };
                        } catch (e) {
                            return null;
                        }
                    })
                    .filter(arrayfilter.emptyReject());
            }
        }
    });
}

module.exports = indexJsBud;

