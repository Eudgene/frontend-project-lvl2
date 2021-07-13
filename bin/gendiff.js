#!/usr/bin/env node

const { program } = require('commander');
program
    .description('example')
    .version('0.0.1', '-v, --vers', 'output the current version');

program.parse();
