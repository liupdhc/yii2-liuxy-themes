/**
 * Created by liupeng on 2015/4/11.
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: [ 'build' , 'output']
            }
        },
        uglify: {
            options: {
                preserveComments: 'false'
            },
            build: {
                options: {
                    report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [
                    {
                        expand: true,
                        cwd: 'scripts/pages',//js目录下
                        src: '*.js',//所有js文件
                        dest: 'output/scripts'//输出到此目录下
                    },{
                        'scripts/extend.min.js':[ 'scripts/extend.js']
                    },{
                        'scripts/locales/admin-lang.zh-CN.min.js':[ 'scripts/locales/admin-lang.zh-CN.js']
                    }
                ]
            }
        },
        concat: {
            options: {
                preserveComments: 'false',
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n',
                separator: '\n'
            },
            js_app: {
                src: ['output/scripts/*.js'],
                dest: 'scripts/admin.min.js'
            }
        },
        cssmin: {
            build: {
                options : {
                    compatibility : 'ie8', //设置兼容模式
                    noAdvanced : true //取消高级特性
                },
                files: [
                    {expand: true,
                        cwd: 'css',
                        src: 'admin.css',
                        dest: 'css',
                        ext: '.min.css'}
                ]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-copy');
//    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['clean','uglify', 'concat', 'cssmin']);

};