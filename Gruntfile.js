// Generated on 2014-06-02 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/**/*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // Define the configuration for all the tasks

  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      // bower: {
      //   files: ['./bower.json'],
      //   tasks: ['bowerInstall']
      // },
      js: {
        files: ['/app/scripts/**/*.js'],
        tasks: ['newer:jshint:all','build']
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['/app/styles/**/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer','build']
      },
      less: {
        files: ['/app/assets/less/*.less'],
        tasks: ['less:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: 1337
        },
        files: [
          '/app/views/**/*.html',
          '/app/scripts/**/*.js',
          '/app/assets/**/*.css',
          '/app/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },


    // The actual grunt server settings
    connect: {
      options: {
        port: 9001,
        host: '0.0.0.0',
        open: 'http://localhost:<%= connect.options.port %>'
      },
      proxies: [
        {
          context: '/j_security_check',
          host: '0.0.0.0',
          port: 8443,
          https: true
        }
      ],
      // courtesy of Phubase Tiewthanom
      livereload: {
        options: {
          middleware: function (connect) {
            var middlewares = [];
                    
              middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

              // Serve static files
              middlewares.push(
                connect.static('.tmp'),
                connect().use(
                    '/bower_components',
                    connect.static('./bower_components')
                ),
                connect.static(require('./bower.json').appPath || 'app')
              );

              return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '/app'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '/app/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/css/',
          src: '**/*.css',
          dest: '.tmp/assets/css/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['/app/index.html'],
        // we're not going to inject these as they're lazyloaded
        exclude: ['requirejs',
                  'mocha',
                  'jquery.vmap.europe.js',
                  'jquery.vmap.usa.js',
                  'Chart.min.js',
                  'raphael',
                  'morris',
                  'jquery.inputmask',
                  'jquery.validate.js',
                  'jquery.stepy.js',
                  'fullcalendar.js'
                  ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/assets/css/**/*.css',
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '/app/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/assets/css/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        // root: '/app',
        relativeTo: '/app',
        processImport: true,
        noAdvanced: true
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '/app/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '/app/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/**/*.html',
            'images/**/*',
            'scripts/**/*.js',
            'assets/**',
            'bower_components/**/*',
            // these files are lazyloaded
            /*'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js',
            'bower_components/jquery-validation/dist/jquery.validate.js',
            'bower_components/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
            'bower_components/jqvmap/jqvmap/maps/jquery.vmap.usa.js',
            'bower_components/stepy/lib/jquery.stepy.js',
            'bower_components/Chart.js/Chart.min.js',
            'bower_components/raphael/raphael.js',
            'bower_components/morris.js/morris.js',
            'bower_components/fullcalendar/dist/fullcalendar.js',*/
            'assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-cn-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-dk-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-europe-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-in-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-nl-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-se-mill-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-us-aea-en.js',
            'assets/plugins/jvectormap/jquery-jvectormap-us-ny-newyork-mill-en.js'
          ]
        }, {
          expand: true,
          flatten: false,
          cwd: '/app/assets/plugins/iCheck/skins',
          dest: '<%= yeoman.dist %>/assets/css/',
          src: ['*/*.png']
        }, {
          expand: true,
          flatten: true,
          cwd: '/app',
          dest: '<%= yeoman.dist %>/assets/css/fonts',
          src: ['bower_components/themify-icons/fonts/*']
        }, {
          expand: true,
          flatten: true,
          cwd: '/app',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: ['bower_components/font-awesome/fonts/*']
        }]
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: '/app',
        dest: '<%= yeoman.dist %>/assets/fonts',
        src: ['bower_components/font-awesome/fonts/*']
      },
      styles: {
        expand: true,
        cwd: '/app/assets/css',
        dest: '.tmp/assets/css',
        src: '**/*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'copy:dist'
        // 'imagemin',
        // 'svgmin'
      ]
    },
    ngtemplates:  {
      app: {
        src:      'app/views/templates/**.html',
        dest:     'app/scripts/core/modules/templates.js',
        options:  {
          url:    function(url) { return url.replace('app/views/', ''); },
          bootstrap: function(module, script) {
            return '/* jshint ignore:start */\nangular.module(\'theme.core.templates\', []).run([\'$templateCache\', function ($templateCache) {\n'+script+'}])\n/* jshint ignore:end */';
          }
        }
      }
    },
    less: {
      server: {
        options: {
          // strictMath: true,
          dumpLineNumbers: true,
          sourceMap: true,
          sourceMapRootpath: '',
          outputSourceFiles: true
        },
        files: [
          {
            expand: true,
            cwd: '/app/assets/less',
            src: 'styles.less',
            dest: '.tmp/assets/css',
            ext: '.css'
          }
        ]
      },
      dist: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: [
          {
            expand: true,
            cwd: '/app/assets/less',
            src: 'styles.less',
            dest: '.tmp/assets/css',
            ext: '.css'
          }
        ]
      }
    },
    
    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    processhtml: {
      options: {
        commentMarker: 'prochtml',
        process: true
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      // 'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'configureProxies:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'less:dist',
    'copy:dist',
    'processhtml:dist'
    
  ]);

  grunt.loadNpmTasks('grunt-openport');
  grunt.registerTask('default', ['build']);



};
