
'use strict';

exports.description = 'Setups a basic HTML project.';
exports.notes = 'This will ask you some questions on how to setup your project.';
exports.after = 'Please run `npm install` to install the node modules and then' +
                ' `grunt` to start the local server (for live reload).';

exports.template = function(grunt, init, done) {
  var list = [
      init.prompt('js_file','y'),
      init.prompt('css_file','y'),
      init.prompt('gruntfiles','y'),
      init.prompt('ftpush','y'),
      init.prompt('project_name', function(value, props, done) {
        if(props.ftpush) {
          list.splice(list.length - 1,0,init.prompt('ftppass','pass'));
          list.splice(list.length - 2,0,init.prompt('ftphost','host'));
          list.splice(list.length - 2,0,init.prompt('ftpuser','user'));
        }
        done();
      }),
  ];

  init.process({}, list, function(err, props) {

    if(props.project_name === 'undefined'){
      props.project_name = 'newProject';
    }

    var files = init.filesToCopy(props);

    props.ftpush = /y/i.test(props.ftpush);
    props.gruntfiles = /y/i.test(props.gruntfiles);
    props.css_file = /y/i.test(props.css_file);
    props.js_file = /y/i.test(props.js_file);

    // removing files which the user does not need.
    if(!props['gruntfiles']){
      delete files['Gruntfile.js'];
    }

    if(!props['css_file']){
      delete files['css/style.css'];
    }

    if(!props['js_file']){
      delete files['js/javascript.js'];
    }

    if(!props['ftpush']){
      delete files['.ftppass'];
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