#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();
program
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1', '-V, --version', 'output the version number')
    .argument('<filepath1>', 'path to file1')
    .argument('<filepath2>', 'path to file2')
    .argument('<username>', 'user to login')
    .argument('[password]', 'password for user, if required', 'no password given')
    .option('-f, --format [type]', 'output format');

program.parse();
