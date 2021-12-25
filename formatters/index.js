import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './json.js';

const chooseFormat = (base, name) => {
  let result;
  if (name === 'stylish') {
    result = stylish(base, ' ', 2);
  } else if (name === 'plain') {
    result = plain(base);
  } else if (name === 'json') {
    result = toJson(base);
  }
  return result;
};

export default chooseFormat;
