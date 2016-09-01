module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            js: {
                files: {'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']}
            }
        }
    });
};
