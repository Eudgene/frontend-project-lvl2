import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parsFunc from './parsers.js';

const isObject = (obj) => {
  const type = typeof obj;
  if(type === 'object' && obj !== null) {
    return true;
  }
  return false;
};

const result = [];
const goOnTree = (tree) => {
  const keys = Object.keys(tree)
    .map((item) => {
    if(isObject(tree[item])) {
      result.push(`${item}`);
      goOnTree(tree[item]);
    } else {
      result.push(`${item}: ${tree[item]}`);
    }
  });
  return result;
};

export const takeObjectFromJson = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readJson = parsFunc(read, filePath);
  return readJson;
};

export const newResd = (filepath1, filepath2) => {
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
};
