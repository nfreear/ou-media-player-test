/*! Open Media Player tests | Nick Freear, 16 April 2016 | © The Open University.
*/
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		jshint: {
			options: {
				bitwise: true,
				curly: true,
				eqeqeq: true,
				freeze: true,
				funcscope: true,
				futurehostile: true,
				latedef: true,
				laxcomma: true,
				nocomma: true,
				strict: true,
				undef: true,
				//unused: true,
				// https://github.com/jshint/jshint/blob/master/src/messages.js#L80
				//'-W027': true,  // Ignore Unreachable '{a}' after '{b}'.
				//'-W030': true,  // Ignore Expected an assignment or function call and instead saw an expression.
				//'-W069': true,  // Ignore ['a'] is better written in dot notation;
        node: true,  //globals: { module:false, require:false, console:false, process:false, __dirname:false }
				globals: {
					describe: false, it: false, expect: false, after: false, before: false,
					request: false, page: false, external: false, log: false, rss_parser: false, delay: true, R: true
				}
			},
			test:  'test/**/*.js',
			grunt: 'Gruntfile.js'
		},

		watch: {
			all: { files: './**/*.js', tasks: 'jshint' }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('hello', function () {
		console.log('Hello world!');
	});

	grunt.registerTask('default', [ 'jshint' ]);
};
