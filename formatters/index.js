import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const chooseFormat = (base, format) => {
    console.log(format === 'stylish');
    
  let result;
  if (format === 'stylish') {
    
    result = stylish(base, ' ', 2);
  } else if (format === 'plain') {
    result = plain(base);
  }
  return console.log(result);
};

export default chooseFormat;