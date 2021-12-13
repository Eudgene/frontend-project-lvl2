import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './json.js';

const chooseFormat = (base, name) => {
  let result;
  if (name.format === 'stylish') {
    result = stylish(base, ' ', 2);
  } else if (name.format === 'plain') {
    result = plain(base);
  } else if (name.format === 'json') {
    result = toJson(base);
  }
  return console.log(result);
};

export default chooseFormat;
