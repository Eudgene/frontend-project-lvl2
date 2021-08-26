#!/usr/bin/env node

import { Command } from 'commander';
import _ from 'lodash';
import takeObjectFromJson from '../bin/funcs.js';
import newResd from '../bin/funcs.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const json1 = takeObjectFromJson(filepath1);
    const json2 = takeObjectFromJson(filepath2);
    const arr = Object.keys(json1);
    const arr2 = Object.keys(json2);
    const commonArr = _.uniq(arr.concat(arr2).sort());
    console.log(commonArr);
    const finishedArray = [];
    const newArr = newResd(commonArr, finishedArray);
    console.log('{');
    newArr.map((item) => console.log(item));
    console.log('}');
  });

program.parse();
