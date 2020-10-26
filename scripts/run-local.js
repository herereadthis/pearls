const shell = require('shelljs');
const helpers = require('yargs/helpers');
const yargs = require('yargs/yargs');

const hideBin = helpers.hideBin;
const argv = yargs(hideBin(process.argv)).argv;

console.log(argv);

try {
    // shell.exec('cd ./src');
    shell.exec('node ./node_modules/less/bin/lessc ./src/less/styles.less ./temp/styles.css');
    shell.exec('node ./node_modules/http-server/bin/http-server ./ --port ' + argv.port);
} catch (err) {
    console.error('Something bad happened');
    console.error(err);
    process.exit(1);
}
