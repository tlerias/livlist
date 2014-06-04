module.exports = function(grunt){

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit: {
        configFile: 'config/karma.conf.js',
        background: true
      }
    },

    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['index.html']
      }
    },

    watch: {
      html: {
        files: ['**/.html'],
        tasks: ['htmlhint']
      },
      js:{
        files: ['dest/scripts/script.js'],
        tasks: ['uglify']
      },
      css: {
        files: [
          'assets/**/*.scss',
          'public/stylesheets/**/*.css'
        ],
        tasks: ['buildcss']
      },
      karma: {
        files: ['test/unit/**/*Spec.js', 'public/scripts/**/*.js'],
        tasks: ['karma:unit:run']
      }
    },

    uglify: {
      build: {
        files: {
          'dest/scripts/script.js': [
            'public/**/*.js',
            'models/**/*.js',
            'routes/**/*.js',
            'app/**/*.js'
          ]
        }
      }
    },

    cssc: {
      build: {
        options: {
          consolidateViaDeclarations: true,
          consolidateViaSelectors: true,
          consolidateMediaQueries: true
        },
        files: {
          'dest/stylesheets/style.css': [
            'assets/**/*.scss',
            'public/stylesheets/**/*.css'
          ]
        }
      }
    },

    cssmin: {
      build: {
        src: 'dest/stylesheets/style.css',
        dest: 'dest/stylesheets/style.css'
      }
    },

    sass: {
      build: {
        files: {
          'dest/stylesheets/style.css': 'assets/stylesheets/*.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', []);
  grunt.registerTask('htmlhint', []);
  grunt.registerTask('build',  ['sass', 'cssc', 'cssmin', 'uglify']);
  grunt.registerTask('test', ['karma:unit', 'watch']);
};
