import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import { takeObjectFromJson, newResd } from '../bin/funcs.js';
import parsFunc from '../bin/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const exemple = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  }
};

const exemple1 = {
  "common": {
     "follow": false,
     "setting1": "Value 1",
     "setting3": null,
     "setting4": "blah blah",
     "setting5": {
       "key5": "value5"
     },
     "setting6": {
       "key": "value",
       "ops": "vops",
       "doge": {
         "wow": "so much"
      }
    }
  }
};

const resulted = {
  common: [
    '  ',
    {
      follow: [ '+ ', false ],
      setting1: [ '  ', 'Value 1' ],
      setting2: [ '- ', 200 ],
      setting3: [ '- ', '+ ', true, null ],
      setting4: [ '+ ', 'blah blah' ],
      setting5: [ '+ ', { key5: 'value5' } ],
      setting6: [
        '  ',
        {
          doge: [ '  ', { wow: [ '- ', '+ ', '', 'so much' ] } ],
          key: [ '  ', 'value' ],
          ops: [ '+ ', 'vops' ]
        }
      ]
    }
  ]
};

describe('1-Сhecking the work of readFile', () => {
  test('When we get some way', () => {
    const res = readFile('file1.json');
    expect(typeof res).toEqual('string');
  });
});

describe('2-Сhecking the type result of TakeObjectFromJson', () => {
  const res = JSON.parse(readFile('file1.json'));
  const res2 = JSON.parse(readFile('file2.json'));
  const obj = takeObjectFromJson('file1.json');
  const obj2 = takeObjectFromJson('file2.json');
  const obj3 = takeObjectFromJson(getFixturePath('file1.json'));

  test('Cheking type of result', () => {
    expect(typeof obj).toEqual('object');
    expect(typeof obj2).toEqual('object');
    expect(typeof obj3).toEqual('object');
  });

  test('Сhecking the result for compliance with the expected', () => {
    expect(obj).toEqual(res);
    expect(obj3).toEqual(res);
    expect(obj2).toEqual(res2);
  });

  test('Сhecking for exceptions', () => {
    expect(() => takeObjectFromJson('file1.js')).toThrow();
  });
});

describe('3-Сhecking the newResd', () => {
  const res = newResd('file1.json', 'file2.json');

  test('Cheking type of result', () => {
    expect(typeof res).toEqual('object');
  });

  test('Сhecking for exceptions', () => {
    expect(() => takeObjectFromJson('file1.js', 'file2.js')).toThrow();
  });

  test('Сhecking the result for compliance with the expected', () => {
    expect((resulted) => takeObjectFromJson(exemple, exemple1));
  });
});

describe('4-Сhecking the Parsers', () => {
  const res = parsFunc(readFile('file1.json'), getFixturePath('file1.json'));
  const res2 = parsFunc(readFile('fixtures/file1.yml'), getFixturePath('fixtures/file1.yml'));

  test('Cheking type of result', () => {
    expect(typeof res).toEqual('object');
    expect(typeof res2).toEqual('object');
  });

  test('Сhecking for exceptions', () => {
    expect(() => parsFunc(readFile('file1.ml'), getFixturePath('file1.ml'))).toThrow();
  });
});
