import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import takeObjectFromJson from '../bin/funcs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('file type', () => {
  const res = readFile('file1.json');
  expect(typeof res).toEqual('string');
});

test('takeObjectFromJson result type', () => {
  const obj = takeObjectFromJson('file1.json');
  const obj2 = takeObjectFromJson('file2.json');
  const obj3 = takeObjectFromJson('frontend-project-lvl2\file1.json');
  expect(typeof obj).toEqual('object');
  expect(typeof obj2).toEqual('object');
  expect(typeof obj3).toEqual('object');
});
