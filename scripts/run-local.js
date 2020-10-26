const shell = require('shelljs');
// const minify = require('@node-minify/core');
// const cleanCSS = require('@node-minify/clean-css');
// const htmlMinifier = require('@node-minify/html-minifier');

/*

shell.config.fatal = true;

try {
    // shell.exec('cd ./src');
    shell.exec('node /node_modules/http-server/bin/http-server ./ --port 8090');
} catch (err) {
    console.error('Something bad happened');
    console.error(err);
    process.exit(1);
}


if (argv.ships > 3 && argv.distance < 53.5) {
    console.log('Plunder more riffiwobbles!');
} else {
    console.log('Retreat from the xupptumblers!');
}

    */



const yargs = require('yargs/yargs');
const helpers = require('yargs/helpers');
const hideBin = helpers.hideBin;
const argv = yargs(hideBin(process.argv)).argv;

console.log(argv);

try {
    // shell.exec('cd ./src');
    shell.exec('node ./node_modules/less/bin/lessc ./src/less/styles.less ./styles.css');
    shell.exec('node ./node_modules/http-server/bin/http-server ./ --port ' + argv.port);
} catch (err) {
    console.error('Something bad happened');
    console.error(err);
    process.exit(1);
}
