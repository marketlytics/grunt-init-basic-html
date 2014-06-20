
'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
//exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    
      init.prompt('js_file','y'),
      init.prompt('css_file','y'),
      init.prompt('gruntfiles','y'),
      init.prompt('html','y'),
      init.prompt('ftpush','y'),
      init.prompt('project_name','newproject'),
      //init.prompt('html_file',''),
    
  ], function(err, props) {
        // Files to copy (and process).
    var files = init.filesToCopy(props);
    props.gruntfiles = /y/i.test(props.gruntfiles);
    props.css_file = /y/i.test(props.css_file);
    props.js_file = /y/i.test(props.js_file);
    props.html = /y/i.test(props.html);
    props.ftpush = /y/i.test(props.ftpush);

    console.log(files);
    if(!props['gruntfiles']){
      delete files['Gruntfile.js'];
    }
    if(!props['css_file']){
      delete files['css/style.css'];
    }
    if(!props['js_file']){
      delete files['js/javascript.js'];
    }
    if(!props['html']){
      delete files['index.html'];
    }
    if(!props['ftpush']){
      delete files['.ftppush'];
    }

  if (props.gruntfiles) {
      var devDependencies = {
        "grunt": "~0.4.2",
        "grunt-contrib-jshint": "~0.7.2",
        "grunt-contrib-watch": "~0.5.3",
        "grunt-contrib-connect": "^0.8.0"
      };

      if (props.ftpush) {
        devDependencies["grunt-ftpush"] = "^0.3.3";
      }
      // Generate package.json file, used by npm and grunt.
      init.writePackageJSON('package.json', {
        node_version: '>= 0.10.0',
        devDependencies: devDependencies
      });
    }

    init.copyAndProcess(files,props);
    done();





  });

};