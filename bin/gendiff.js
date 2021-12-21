#!/usr/bin/env node

import { Command } from 'commander';
import { takeObjectFromJson } from './funcs.js';
import chooseFormat from '../formatters/index.js';
import _ from 'lodash';

const newResd = (tree, tree1) => {
  const keys1 = Object.keys(tree1);
  const keys = Object.keys(tree);
  const finishedArray = {};
  _.uniq(keys.concat(keys1).sort())
    .map((item) => {
      if (keys1.includes(item)) {
        if (_.isPlainObject(tree1[item])) {
          if (tree[item]) {
            const newItem = 'notChanged';
            finishedArray[item] = [newItem, newResd(tree[item], tree1[item])];
          } else {
            const newItem1 = 'added';
            finishedArray[item] = [newItem1, tree1[item]];
          }
        } else if (tree[item] === tree1[item]) {
          const newItem = 'notChanged';
          finishedArray[item] = [newItem, tree[item]];
        } else if (keys.includes(item)) {
          const newItem = 'updated';
          finishedArray[item] = [newItem, tree[item], tree1[item]];
        } else {
          const newItem1 = 'added';
          finishedArray[item] = [newItem1, tree1[item]];
        }
      } else if (_.isPlainObject(tree[item])) {
        const newItem = 'removed';
        finishedArray[item] = [newItem, tree[item]];
      } else {
        const newItem1 = 'removed';
        finishedArray[item] = [newItem1, tree[item]];
      }
      return finishedArray;
    });
  return finishedArray;
};

function gendiff() {
const program = new Command();
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish', 'stylish')
  .action((filepath1, filepath2, format = 'stylish') => {
    const json1 = takeObjectFromJson(filepath1);
    const json2 = takeObjectFromJson(filepath2);
    const newArr = newResd(json1, json2);
    chooseFormat(newArr, format);
  });
  
program.parse();
};
export default gendiff;
