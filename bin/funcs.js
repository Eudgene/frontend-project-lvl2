#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parsFunc from './parsers.js';

export const takeObjectFromJson = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readJson = parsFunc(read, filePath);
  return readJson;
};

const newResd = (tree, tree1) => {
  const json1 = takeObjectFromJson(tree);
  const json2 = takeObjectFromJson(tree1);
  console.log(json1);
  const keys1 = Object.keys(json2);
  const keys = Object.keys(json1);
  const finishedArray = {};
  _.uniq(keys.concat(keys1).sort())
    .map((item) => {
      if (keys1.includes(item)) {
        if (_.isPlainObject(json2[item])) {
          if (json1[item]) {
            const newItem = 'notChanged';
            finishedArray[item] = [newItem, newResd(json1[item], json2[item])];
          } else {
            const newItem1 = 'added';
            finishedArray[item] = [newItem1, json1[item]];
          }
        } else if (json2[item] === json1[item]) {
          const newItem = 'notChanged';
          finishedArray[item] = [newItem, json1[item]];
        } else if (keys.includes(item)) {
          const newItem = 'updated';
          finishedArray[item] = [newItem, json1[item], json2[item]];
        } else {
          const newItem1 = 'added';
          finishedArray[item] = [newItem1, json2[item]];
        }
      } else if (_.isPlainObject(json1[item])) {
        const newItem = 'removed';
        finishedArray[item] = [newItem, json1[item]];
      } else {
        const newItem1 = 'removed';
        finishedArray[item] = [newItem1, json1[item]];
      }
      return finishedArray;
    });
  return finishedArray;
};

export default newResd;