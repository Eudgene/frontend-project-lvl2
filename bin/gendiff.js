#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from './funcs.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish', 'stylish')
  .action((filepath1, filepath2, format = 'stylish') => {
    console.log(gendiff(filepath1, filepath2, format.format));
  });

program.parse();
