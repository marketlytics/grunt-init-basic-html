
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
      //init.prompt('html_file',''),
    
  ], function(err, props) {
        // Files to copy (and process).
    console.log(props['gruntfiles']);
    var files = init.filesToCopy(props);

    console.log(files);
    if(props['gruntfiles'] !== 'y'){
      delete files['Gruntfile.js'];
      delete files['package.json'];
    }
    if(props['css_file'] !== 'y'){
      delete files['css/style.css'];
    }
    if(props['js_file'] !== 'y'){
      delete files['js/java.js'];
    }
    if(props['html'] !== 'y' ){
      delete files['index.html'];
    }


    /*
    grunt.file.setBase('%UserProfile%/.grunt-init/trial');
    console.log(grunt.file.expandPath('/~/.grunt-init/trial'));
    console.log(grunt.file.exists('indexTemplates'));
    if(props['html_file'] !== ''){
      files['index.html'] = 'trial/indexTemplates/'+ props['html_file'] +'/' + 'index.html';
    }
    console.log(files);
    */
    

    init.copyAndProcess(files);
    done();





  });

};