import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './json.js';

const chooseFormat = (base, name) => {
  if (name === 'plain') {
    return plain(base);
  }
  if (name === 'json') {
    return toJson(base);
  }
  return stylish(base, ' ', 2);
};

export default chooseFormat;
