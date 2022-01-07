#!/usr/bin/env node

import { Command } from 'commander';
//import gendiff from './funcs.js';
import chooseFormat from '../formatters/index.js';
import { newResd } from './funcs.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const preResalt = newResd(filepath1, filepath2);
  return chooseFormat(preResalt, format);
};

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
