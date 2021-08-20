import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import * as func from '../bin/gendiff.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const getFixturePath = (filename) => path.join(_dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('file type', () => {
  const res = readFile('file1.json');
  console.log(res);
  expect(typeof res).toEqual('string');
});

test('takeObjectFromJson result type', () => {
  const obj = func.takeObjectFromJson('file1.json');
  expect(typeof obj).toEqual('object');
});
