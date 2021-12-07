import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormat = (base, name) => {
  let result;
  if (name.format === 'stylish') {
    result = stylish(base, ' ', 2);
  } else if (name.format === 'plain') {
    result = plain(base);
  }
  return console.log(result);
};

export default chooseFormat;
