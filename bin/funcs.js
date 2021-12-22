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

export const newResd = (tree, tree1) => {
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
