import _ from 'lodash';

const valueInString = (value) => {
  if (value === null) {
    return null;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (val) => {
  const iter = (currentValue, stringWay = '', depth = 0) => {
    const lines = currentValue.map(({
      item, prefix, value, value2,
    }) => {
      const findPrefix = (way) => {
        if (way !== '') {
          const arr = way.split('.');
          if (arr.length !== depth) {
            _.slice(arr, 0, arr.length - 1);
            return arr.join('.');
          }
        }
        return way;
      };
      const prefixWay = findPrefix(stringWay);
      const wayInString = prefixWay === '' ? item : `.${item}`;
      if (prefix === 'added') {
        return `Property '${prefixWay}${wayInString}' was added with value: ${valueInString(value)}`;
      }
      if (prefix === 'removed') {
        return `Property '${prefixWay}${wayInString}' was removed`;
      }
      if (prefix === 'updated') {
        return `Property '${prefixWay}${wayInString}' was updated. From ${valueInString(value)} to ${valueInString(value2)}`;
      }
      if (prefix === 'notChanged') {
        const pref = findPrefix(stringWay);
        const newPrefix = `${pref}.${item}`;
        const newString = pref === '' ? item : newPrefix;
        if (typeof value === 'object') {
          return iter(value, newString, depth + 1);
        }
        return '';
      }
      return ' ';
    });

    return [
      ...lines,
    ].filter(Boolean).join('\n').trim();
  };

  return iter(val);
};

export default plain;
