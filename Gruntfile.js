module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-browserify");

    grunt.registerTask("build", ["clean", "eslint", "browserify"]);
    grunt.registerTask("dev", ["build", "watch"]);
    grunt.registerTask("default", ["build"]);
}