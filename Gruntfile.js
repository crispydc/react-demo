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
            options: {
                configFile: 'eslint-config.json'  
            },
            src: ['client/**/*.js']
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
                    "./dist/bundle.js": ["./client/main.js"]
                }
            }
        },
        
        watch: {
            js_src: {
                files: ['client/**/*.js'],
                tasks: ['eslint', 'browserify']
            },
            html: {
                files: ['*.html'],
                tasks: ['copy:html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-copy');
    

    grunt.registerTask("build", ["clean", "eslint", "browserify", "copy"]);
    grunt.registerTask("dev", ["build", "watch"]);
    grunt.registerTask("default", ["build"]);
}