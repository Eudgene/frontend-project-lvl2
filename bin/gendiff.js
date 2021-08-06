#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import * as fs from 'fs';
//import * as _ from 'lodash';
//import pkg from 'lodash';
//const { uniq } = pkg;
import uniq from 'lodash/uniq';
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
      const commonArr = uniq(arr.concat(arr2).sort());
      const newResd = commonArr.map((item) => {
        if (arr2.includes(item)) {
          if (json1[item] === json2[item]) {
            console.log(`  ${item}: ${json1[item]}`);
          } else {
            const b = json1[item] ? `- ${item}: ${json1[item]}\n+ ${item}: ${json2[item]}` : `+ ${item}: ${json2[item]}`;
          console.log(b);
          }
        } else {
          console.log(`- ${item}: ${json1[item]}`);
        }
      })
    });

program.parse();

//export default program;
