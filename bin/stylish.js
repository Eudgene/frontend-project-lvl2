import _ from 'lodash';

const stylish = (data, elem = ' ', acc = 1) => {
  const newKeys = [];
  const str = `${data}`;
  if (_.isPlainObject(data)) {
    newKeys.push('{');
    let velue = 0;
    const keyBypass = (someKey, element, accumulator) => {
      velue += accumulator;
      Object.keys(someKey)
        .map((key) => {
          if (_.isPlainObject(someKey[key])) {
            newKeys.push(`${element.repeat(velue)}${key}: {`);
            keyBypass(someKey[key], element, accumulator);
            newKeys.push(`${element.repeat(velue -= accumulator)}}`);
          } else {
            newKeys.push(`${element.repeat(velue)}${key}: ${someKey[key]}`);
          }
          return newKeys;
        });
      return newKeys;
    };
    keyBypass(data, elem, acc);
    newKeys.push('}');
    return newKeys.join('\n');
  }
  return str;
};

export default stylish;
