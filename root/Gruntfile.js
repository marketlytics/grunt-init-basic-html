'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      js: {
        src: 'js/*.js'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    
    watch: {
      index:{
        files: ['index.html'],
        options: {
          livereload: 35729
        }
      },
      js: {
        files:['js/*.js'],
        tasks: ['jshint:js',],
          options:{
          livereload: 35729
        }
      },
      gruntfile: {
        files: '<%= jshint.gruntfile %>',
        tasks: ['jshint:gruntfile']
      },
    },

    connect:{
      server:{
        options:{
          port: 3000,
          livereload: 35729
        }
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect','watch','jshint']);

};
