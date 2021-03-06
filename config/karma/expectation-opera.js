'use strict';

var common = require('./expectation.js');

module.exports = function (config) {

    common(config);

    config.set({

        browsers: [
            'Opera'
        ],

        files: [
            'test/expectation/any/**/*.js',
            'test/expectation/opera/**/*.js',
            {
                included: false,
                pattern: 'test/fixtures/**',
                served: true
            }
        ],

        preprocessors: {
            'test/expectation/any/**/*.js': 'browserify',
            'test/expectation/opera/**/*.js': 'browserify'
        }

    });

};
