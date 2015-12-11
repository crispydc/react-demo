module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
        },
        
        copy : {
            html : {
                src : ['*.html'],
                dest : 'dist/',
            }
        },

        eslint: {
            src: ['js/**/*.js']
        },

        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            presets: "react"
                        }]
                    ]
                },
                files: {
                    "./dist/bundle.js": ["./js/main.js"]
                }
            }
        },
        
        watch: {
            js_src: {
                files: ['js/**/*.js'],
                tasks: ['eslint', 'browserify']
            },
            html: {
                files: ['*.html'],
                tasks: ['copy:html']
            }
        },
        
        connect: {
            server: {
                options: {
                    base: 'dist'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    

    grunt.registerTask("build", ["clean", "eslint", "browserify", "copy"]);
    grunt.registerTask("dev", ["build", "connect", "watch"]);
    grunt.registerTask("default", ["build"]);
}