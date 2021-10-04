#!/usr/bin/env node

import { Command } from 'commander';
import { newResd } from './funcs.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const newArr = newResd(filepath1, filepath2);
    JSON.stringify(newArr, null, 2)
  });

program.parse();
