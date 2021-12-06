import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const chooseFormat = (base, format) => {
  let result;
  console.log(format['format']);
  if (format[format] === 'stylish') {
    result = stylish(base, ' ', 2);
  } else if (format[format] === 'plain') {
    result = plain(base);
  }
  return console.log(result);
};

export default chooseFormat;