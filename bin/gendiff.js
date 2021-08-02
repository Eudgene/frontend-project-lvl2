#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import { cwd } from 'process';
const program = new Command();
program
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1', '-V, --version', 'output the version number')
    .argument('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
        //const fs = require('fs');
        //const _ = require('lodash');
        //console.log(filepath1, filepath2);
        //const path = require('path');
        console.log(path.resolve(filepath1));
        const takeObjectFromJson = (file) => {
          const read = fs.readFileSync(file, 'utf8');
          const readJson = JSON.parse(read);
            return readJson;
        }
        const isAbsOrNot = (file) => {
          return path.isAbsolute(file) ? process.cwd(file) : path.resolve(file);
        }
        const json1 = takeObjectFromJson(isAbsOrNot(filepath1));
        const json2 = takeObjectFromJson(isAbsOrNot(filepath2));
        const arr = Object.keys(json1);
        const arr2 = Object.keys(json2);
        const commonArr = _.uniq(_.concat(arr, arr2));
        const newResd = commonArr.map((item) => {
          if (arr2.includes(item)) {
            if (json1[item] === json2[item]) {
              return `${item}: ${json1[item]}`;
            }
            return json1[item] ? `- ${item}: ${json1[item]} + ${item}: ${json2[item]}` : `+ ${item}: ${json2[item]}`;
          }
          return `+ ${item}: ${json1[item]}`;
        })
        return newResd;
    });

program.parse();

export default program;
