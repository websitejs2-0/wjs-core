var path = require('path'),
    config = require(path.join('..', '..', 'project.config.js')),
    fs = require('fs-extra'),
    chalk = require('chalk'),
    glob = require('glob'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    pretty = require('pretty');
    handlebarsLib = require('../../src/js/libs/handlebars-lib.js');

// select Handlebar partials
var objects = glob.sync(path.join(config.folders.src.objects, '**/*.object.html')),
    components = glob.sync(path.join(config.folders.src.components, '**/*.html')),
    partials = objects.concat(components);

// register Handlebar partials
handlebarsLib.registerPartials(partials);

// html beautify options
var prettyOptions = {
    ocd: true,
    indent_size: 4
};

/**
 * Compiles views by compiling handlebars.
 * @param {function} done Callback.
 */
function compileView(done) {

    // get arguments
    var args = process.argv.slice(3);

    if (args.length < 1) {
        console.log(chalk.red('\nCompile Error: At least specify a type to compile (--c, --component).'));
        console.log(chalk.red('Or use "gulp compile --ch" to show help.'));
        console.log('\n');
    } else {

        switch(args[0]) {
            case '--ch':
            case '--chelp': {
                console.log('\n\nTo use gulp compile specify the following parameters:');
                console.log('%s\t%s', chalk.yellow('--component <componentname>'), chalk.white('Compiles component of given name'));
                console.log('%s\t\t\t\t%s', chalk.yellow('--c'), chalk.white('Compiles all components'));
                console.log('\n\n');
                break;
            }
            case '--c':
            case '--component': {

                if (typeof args[1] !== 'undefined') {
                    if (typeof Handlebars.partials[args[1]] !== 'undefined') {
                        var file = path.join(config.folders.build.components, args[1], args[1] + '.html'),
                            tpl = Handlebars.compile(Handlebars.partials[args[1]]),
                            html = pretty(tpl(), prettyOptions);

                        fs.outputFile(file, html, function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        gutil.log('Compiled: %s', chalk.yellow(file));
                    }
                } else {

                    for (var component in Handlebars.partials) {
                        var pat = /\.object/g;
                        if (!pat.exec(component)) {
                            /* jshint ignore:start */
                            var file = path.join(config.folders.build.components, component, component + '.html'),
                                tpl = Handlebars.compile(Handlebars.partials[component]),
                                html = pretty(tpl(), prettyOptions);

                            fs.outputFile(file, html, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            gutil.log('Compiled: %s', chalk.yellow(file));
                            /* jshint ignore:end */
                        }
                    }

                }

                break;
            }
            default: {
                console.log(chalk.red('\nCompile Error: At least specify a type to compile (--c, --component).'));
                console.log(chalk.red('Or use "gulp compile --ch" to show help.'));
                console.log('\n');
                break;
            }
        }

    }

    done();
}

// define tasks and add task information
gulp.task('compile', gulp.series(compileView));
var compile = gulp.task('compile');
compile.displayName = 'compile';
compile.description = 'Compiles handlebars templates to html files.';
