import stylish from 'stylish.js';
import plain from 'plain.js';

const chooseFormat = (base, format) => {
  let result;
  if (format.format === 'stylish') {
    result = stylish(base, ' ', 2);
  } else if (format.format === 'plain') {
    result = plain(base);
  }
  return console.log(result);
};

export default chooseFormat;
