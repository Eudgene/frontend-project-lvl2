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
  const commonArr = _.uniq(keys.concat(keys1).sort());
  commonArr.map((item) => {
      if (keys1.includes(item)) {
        if (_.isPlainObject(tree1[item])) {
          if (tree[item]) {
            const newItem = `  ${item}`;
            finishedArray[newItem] = newResd(tree[item], tree1[item]);
          } else {
            const newItem1 = `+ ${item}`;
            finishedArray[newItem1] = tree1[item];
          }
        } else {
          if (tree[item] === tree1[item]) {
            const newItem = `  ${item}`;
            finishedArray[newItem] = tree[item];
          } else if (tree[item]) {
            const newItem = `- ${item}`;
            const newItem1 = `+ ${item}`;
            finishedArray[newItem] = tree[item];
            finishedArray[newItem1] = tree1[item];
          } else {
            const newItem1 = `+ ${item}`;
            finishedArray[newItem1] = tree1[item];
          }
        }
      } else {
        if (_.isPlainObject(tree[item])) {
          const newItem = `- ${item}`;
          finishedArray[newItem] = tree[item];
        } else {
          const newItem1 = `- ${item}`;
          finishedArray[newItem1] = tree[item];
        }
      }
  });
  return finishedArray;
};
