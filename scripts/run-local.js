const shell = require('shelljs');
const helpers = require('yargs/helpers');
const yargs = require('yargs/yargs');

const hideBin = helpers.hideBin;
const argv = yargs(hideBin(process.argv)).argv;

// console.log(argv);

try {
    // shell.exec('cd ./src');
    shell.exec('rm -rf ./temp');
    shell.exec('node ./node_modules/less/bin/lessc ./src/styles/styles.less ./temp/styles/styles.css');
    shell.exec('cp -r ./src/fonts/ ./temp/fonts/');
    shell.exec('cp -r ./src/favicon.ico ./temp/favicon.ico');
    shell.exec('node ./node_modules/http-server/bin/http-server ./ --port ' + argv.port);
} catch (err) {
    console.error('Something bad happened');
    console.error(err);
    process.exit(1);
}
