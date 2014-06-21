
'use strict';

exports.description = 'Setups a basic HTML project.';
exports.notes = 'This will ask you some questions on how to setup your project.';
exports.after = 'Please run `npm install` to install the node modules and then' +
                ' `grunt` to start the local server (for live reload).';

exports.template = function(grunt, init, done) {
  var list = [
      init.prompt('name'),
      init.prompt('require_js_file','y'),
      init.prompt('require_css_file','y'),
      init.prompt('configure_ftp','y'),
      init.prompt('homepage', function(value, props, done) {

        // check if configure_ftp has Yes, then enable questions
        // for FTP
        if(/y/i.test(props.configure_ftp)) {
          list.splice(list.length - 2,0,init.prompt('ftphost','host'));
          list.splice(list.length - 2,0,init.prompt('ftpuser','user'));
          list.splice(list.length - 2,0,init.prompt('ftppass','pass'));
        }

        done();
      }),
      init.prompt('author_name')
  ];

  init.process({}, list, function(err, props) {

    grunt.log.writeln(props.homepage);

    // homepage value cant set a default
    if(props.homepage === 'undefined'){
      props.homepage = 'example.com';
    }

    var files = init.filesToCopy(props);

    props.configure_ftp = /y/i.test(props.configure_ftp);
    props.require_css_file = /y/i.test(props.require_css_file);
    props.require_js_file = /y/i.test(props.require_js_file);

    // removing files which the user does not need.
    if(!props['gruntfiles']){
      delete files['Gruntfile.js'];
    }

    if(!props['require_css_file']){
      delete files['css/style.css'];
    }

    if(!props['require_js_file']){
      delete files['js/javascript.js'];
    }

    if(!props['configure_ftp']){
      delete files['.ftppass'];
    }

    if (props.gruntfiles) {
      var devDependencies = {
        "grunt": "~0.4.2",
        "grunt-contrib-jshint": "~0.7.2",
        "grunt-contrib-watch": "~0.5.3",
        "grunt-contrib-connect": "^0.8.0"
      };

      if (props.configure_ftp) {
        devDependencies["grunt-configure_ftp"] = "^0.3.3";
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