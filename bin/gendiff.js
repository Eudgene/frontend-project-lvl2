#!/usr/bin/env node

import { Command } from 'commander';
import { takeObjectFromJson } from './funcs.js';
import newResd from './funcs.js'; 
import chooseFormat from '../formatters/index.js';
import _ from 'lodash';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish', 'stylish')
  .action((filepath1, filepath2, format = 'stylish') => {
    //const json1 = takeObjectFromJson(filepath1);
    //const json2 = takeObjectFromJson(filepath2);
    const newArr = newResd(filepath1, filepath2);
    chooseFormat(newArr, format);
  });
  
program.parse();
