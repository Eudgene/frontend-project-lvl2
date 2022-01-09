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

const plain = (value) => {
  let newString;
  const bbb = [];
  const iter = (currentValue, stringWay = '', depth = 0) => {
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        let newStringWay = stringWay;
        if (stringWay !== '') {
          const arr = newStringWay.split('.');
          if (arr.length !== depth) {
            arr.splice(arr.length - 1, 1);
            newStringWay = arr.join('.');
          }
        }
        const wayInString = newStringWay === '' ? key : `.${key}`;
        if (val[0] === 'added') {
          bbb.push(`Property '${newStringWay}${wayInString}' was added with value: ${valueInString(val[1])}`);
        } else if (val[0] === 'removed') {
          bbb.push(`Property '${newStringWay}${wayInString}' was removed`);
        } else if (val[0] === 'updated') {
          bbb.push(`Property '${newStringWay}${wayInString}' was updated. From ${valueInString(val[1])} to ${valueInString(val[2])}`);
        } else if (val[0] === 'notChanged') {
          if (typeof val[1] === 'object') {
            newString = newStringWay === '' ? key : newStringWay += `.${key}`;
            iter(val[1], newString, depth + 1);
          } else {
            iter(val[1], newString, depth + 1);
          }
        }
        return bbb;
      });

    return [
      ...lines[lines.length - 1],
    ].join('\n');
  };

  return iter(value);
};

export default plain;
