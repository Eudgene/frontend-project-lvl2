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

/*export const newResd = (filepath1, filepath2) => {
  const json1 = takeObjectFromJson(filepath1);
  const json2 = takeObjectFromJson(filepath2);
  const arr = goOnTree(json1);
  const arr2 = goOnTree(json2);
  const commonArr = _.uniq(arr.concat(arr2).sort());
  console.log(commonArr);
  const finishedArray = [];
  commonArr.map((item) => {
    if (arr2.includes(item)) {
      if (json1[item] === json2[item]) {
        finishedArray.push(`  ${item}: ${json1[item]}`);
      } else if (json1[item]) {
        finishedArray.push(`- ${item}: ${json1[item]}`);
        finishedArray.push(`+ ${item}: ${json2[item]}`);
      } else {
        finishedArray.push(`+ ${item}: ${json2[item]}`);
      }
    } else {
      finishedArray.push(`- ${item}: ${json1[item]}`);
    }
    return finishedArray;
  });
  return finishedArray;
};*/


export const newResd = (tree, tree1) => {
  const keys1 = Object.keys(tree1);
  const keys = Object.keys(tree);
  const finishedArray = {};
  const commonArr = _.uniq(keys.concat(keys1).sort())
    .map((item) => {
      if(keys1.includes(item)) {
        if(_.isPlainObject(tree1[item])) {
          if(tree[item]) {
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
          } else if(tree[item]) {
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
        if(_.isPlainObject(tree[item])) {
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
