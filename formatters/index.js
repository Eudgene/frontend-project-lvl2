import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const chooseFormat = (base, format) => {
  let result;
  [key, value] = format;
  if (value === 'stylish') {
    result = stylish(base, ' ', 2);
  } else if (value === 'plain') {
    result = plain(base);
  }
  return console.log(result);
};

export default chooseFormat;