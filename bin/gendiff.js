#!/usr/bin/env node

import { Command } from 'commander';
import { newResd, takeObjectFromJson } from './funcs.js';
import stylish from './stylish.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish', 'stylish')
  .action((filepath1, filepath2) => {
    const json1 = takeObjectFromJson(filepath1);
    const json2 = takeObjectFromJson(filepath2);
    const newArr = newResd(json1, json2);
    console.log(stylish(newArr));
  });

program.parse();
