const shell = require('shelljs');
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const htmlMinifier = require('@node-minify/html-minifier');
const replace = require('replace-in-file');
const logger = require('../src/utils/logger');


shell.config.fatal = true;


const yargs = require('yargs/yargs');
const helpers = require('yargs/helpers');
const hideBin = helpers.hideBin;
const argv = yargs(hideBin(process.argv)).argv;

console.log(argv);

try {
    // shell.exec('cd ./src');
    // shell.exec('node ./node_modules/less/bin/lessc ./src/less/styles.less ./styles.css');
    // shell.exec('node ./node_modules/http-server/bin/http-server ./ --port ' + argv.port);
    logger.info('creating dist folder');
    shell.exec('rm -rf dist');
    shell.exec('mkdir dist');
    shell.exec('./node_modules/less/bin/lessc ./src/styles/styles.less ./dist/styles/styles.css');
    shell.exec('cp -r ./src/fonts/ ./dist/fonts/');
    shell.exec('cp -r ./src/favicon.ico ./dist/favicon.ico');
    minify({
        compressor: cleanCSS,
        input: './dist/styles/styles.css',
        output: './dist/styles/styles.min.css',
        callback: function(err, min) {}
    });
    shell.exec('rm ./dist/styles/styles.css');
    minify({
        compressor: htmlMinifier,
        input: './index.html',
        output: './dist/index.html',
        callback: function(err, min) {}
    });
    replace.sync({
        files: './dist/index.html',
        from: /temp\/styles\/styles.css/,
        to: 'styles\/styles.min.css'
    });
    replace.sync({
        files: './dist/index.html',
        from: /temp\/favicon.ico/,
        to: 'favicon.ico'
    });


    if (argv.port !== undefined) {
        logger.info('starting server at http://localhost:' + argv.port);
        shell.exec('node ./node_modules/http-server/bin/http-server ./dist --port ' + argv.port);
    }


} catch (err) {
    logger.error('Something bad happened!');
    logger.error(err);
    process.exit(1);
}

