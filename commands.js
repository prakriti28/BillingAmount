#! /usr/bin/env node
const program = require('commander');

/* 
    Once the app is registered in npm library,
    it would be useful to fetch the version from the package.json.
    [THINK] Hint: During Updates.
*/

const pjson = require('./package.json');
program.version(pjson.version);

const {makeTransaction} = require('./actions');

program
    .command('transact')
    .description('Dummy')
    .action(makeTransaction);
/** 
 * registering a command 
 * 1. name of command
 * 2.desc.
 * 3.corresponding action/func
 */
program.parse(process.argv);
/** parsing command line argumnets */