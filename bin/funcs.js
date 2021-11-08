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
  const arrayOfKeys = ['  ', '+ ', '- '];
  _.uniq(keys.concat(keys1).sort())
    .map((item) => {
      if (keys1.includes(item)) {
        if (_.isPlainObject(tree1[item])) {
          if (tree[item]) {
            finishedArray[item] = [arrayOfKeys[0], newResd(tree[item], tree1[item])];
          } else {
            finishedArray[item] = [arrayOfKeys[1], tree1[item]];
          }
        } else if (tree[item] === tree1[item]) {
          finishedArray[item] = [arrayOfKeys[0], tree[item]];
        } else if (keys.includes(item)) {
          finishedArray[item] = [arrayOfKeys[2], arrayOfKeys[1], tree[item], tree1[item]];
        } else {
          finishedArray[item] = [arrayOfKeys[1], tree1[item]];
        }
      } else if (_.isPlainObject(tree[item])) {
        finishedArray[item] = [arrayOfKeys[2], tree[item]];
      } else {
        finishedArray[item] = [arrayOfKeys[2], tree[item]];
      }
      return finishedArray;
    });
  return finishedArray;
};
