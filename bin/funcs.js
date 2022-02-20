#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parsFunc from './parsers.js';
import chooseFormat from '../formatters/index.js';

export const takeObjectFromJson = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readJson = parsFunc(read, filePath);
  return readJson;
};

const chekingForNull = (item) => {
  if (item === null) {
    return null;
  } 
  return typeof item === 'object' ? [item] : item;
};

const chekingForObject = (it) => {
  if (it === null) {
    return null;
  } 
  if (typeof it === 'object') {
    const prefix = '';
    const keys = Object.keys(it);
    for (const item of keys) {
      if (typeof it[item] === 'object'){
        
        const value = [chekingForObject(it[item])];
        return {item, prefix, value};
      }
      const value = it[item];
      
      return {item, prefix, value};
    }
  }
  return it;
};

export const newResd = (tree, tree1) => {
  const json1 = typeof tree === 'string' ? takeObjectFromJson(tree) : tree;
  const json2 = typeof tree1 === 'string' ? takeObjectFromJson(tree1) : tree1;

  const keys1 = Object.keys(json2);
  const keys = Object.keys(json1);
  const finishedArray = _.sortBy(_.uniq(keys.concat(keys1)));
  const result = finishedArray.map((item) => {
      if (keys1.includes(item)) {
        if (typeof json2[item] === 'object' && json2[item] !== null && typeof json1[item] === 'object') {
          if (typeof json1[item] === 'object') {
            const prefix = 'notChanged';
            const value = newResd(json1[item], json2[item]);
            return {item, prefix, value};
          } else {
            
            const prefix = 'added';
            const value = json2[item];
            return {item, prefix, value};
          }
        }
        if (json2[item] === json1[item]) {
          const prefix = 'notChanged';
          const value = json1[item];
          return {item, prefix, value};
        }
        if (keys.includes(item)) {
          const prefix = 'updated';
          const val = chekingForObject(json1[item]);
          const val2 = chekingForObject(json2[item]);
          const value = chekingForNull(val);
          const value2 = chekingForNull(val2);
          return {item, prefix, value, value2};
        } else {
          const prefix = 'added';
          const val = chekingForObject(json2[item]);
          const value = chekingForNull(val);
          return {item, prefix, value};
        }
      }
      if (_.isPlainObject(json1[item])) {
        const prefix = 'removed';
        const val = chekingForObject(json1[item]);
        const value = chekingForNull(val);
        return {item, prefix, value};
      } else {
        const prefix = 'removed';
        const val = chekingForObject(json1[item]);
        const value = chekingForNull(val);
        return {item, prefix, value};
      }
      return '';
    });
  return result;
  /*const keys1 = Object.keys(json2);
  const keys = Object.keys(json1);
  const finishedArray = _.sortBy(_.uniq(keys.concat(keys1)));
  const newTree = finishedArray.reduce((newObj, item) => {
    if (keys1.includes(item)) {
      if (typeof json2[item] === 'object' && json2[item] !== null && typeof json1[item] === 'object') {
        if (typeof json1[item] === 'object') {
          const newItem = 'notChanged';
          newObj[item] = [newItem, newResd(json1[item], json2[item])];
        } else {
          const newItem1 = 'added';
          newObj[item] = [newItem1, json2[item]];
        }
      } else if (json2[item] === json1[item]) {
        const newItem = 'notChanged';
        newObj[item] = [newItem, json1[item]];
      } else if (keys.includes(item)) {
        const newItem = 'updated';
        newObj[item] = [newItem, json1[item], json2[item]];
      } else {
        const newItem1 = 'added';
        newObj[item] = [newItem1, json2[item]];
      }
    } else if (_.isPlainObject(json1[item])) {
      const newItem = 'removed';
      newObj[item] = [newItem, json1[item]];
    } else {
      const newItem1 = 'removed';
      newObj[item] = [newItem1, json1[item]];
    }
    return newObj;
  }, {});
  return newTree;*/
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const preResalt = newResd(filepath1, filepath2);
  return chooseFormat(preResalt, format);
};

export default gendiff;
