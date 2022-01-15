#!/usr/bin/env node

import newResd from './funcs.js';
import chooseFormat from '../formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const preResalt = newResd(filepath1, filepath2);
  return chooseFormat(preResalt, format);
};

export default gendiff;
