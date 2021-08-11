#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import * as fs from 'fs';
import _ from 'lodash';
import * as path from 'path';
import { cwd } from 'process';
const program = new Command();
program
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1', '-V, --version', 'output the version number')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const takeObjectFromJson = (file) => {
        const filePath = path.isAbsolute(file) ? process.cwd() : path.resolve(file);
        const read = fs.readFileSync(filePath, 'utf8');
        const readJson = JSON.parse(read);
        return readJson;
      }
      const json1 = takeObjectFromJson(filepath1);
      const json2 = takeObjectFromJson(filepath2);
      const arr = Object.keys(json1);
      const arr2 = Object.keys(json2);
      const commonArr = _.uniq(arr.concat(arr2).sort());
      const resArr = {};
      const newResd = commonArr.map((item) => {
       if (arr2.includes(item)) {
        if (json1[item] === json2[item]) {
         resArr['  ' + item] = json1[item];
        } else {
         if (json1[item]) {
          resArr['- ' + item] = json1[item];
          resArr['+ ' + item] = json2[item];
         } else {
          resArr['+ ' + item] = json2[item];
         }
        }
       } else {
        resArr['+ ' + item] = json1[item];
       }
      })
      function replacer(key, value) {
       if (typeof value === "string") {
        return value;
       }
       return value;
      }
      console.log(JSON.stringify(resArr, replacer, '\t'));
    });

program.parse();

//export default program;
