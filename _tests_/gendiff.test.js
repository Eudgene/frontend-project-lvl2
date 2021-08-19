import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import { takeObjectFromJson } from '../bin/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', 'bin', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('file type', () => {
  const res = readFile('file1.json');
  expect(typeof res).toEqual('string');
})

test('takeObjectFromJson result type', () => {
  const obj = takeObjectFromJson('file1.json');
  expect(typeof obj).toEqual('object');
})