import _ from 'lodash';

const toJson = (value) => {
  const iter = (currentValue, depth, arrDepth = [0]) => {
    if (currentValue === null) {
      return 'null';
    }
    if (typeof currentValue !== 'object') {
      const stringVal = typeof currentValue === 'string' ? `"${currentValue.toString()}"` : `${currentValue.toString()}`;
      return stringVal;
    }

    let bbb = {};
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (depth <= _.last(arrDepth)) {
          if (val.length === 2) {
            const newArrDepth = arrDepth.concat(depth);
            bbb = `,"${key}":["${val[0]}",${iter(val[1], depth + 1, newArrDepth)}]`;
          } else if (val.length === 3) {
            const newArrDepth = arrDepth.concat(depth);
            bbb = `,"${key}":["${val[0]}",${iter(val[1], depth + 1, newArrDepth)},${iter(val[2], depth + 1, newArrDepth)}]`;
          } else {
            const newArrDepth = arrDepth.concat(depth);
            bbb = `,"${key}":${iter(val, depth + 1, newArrDepth)}`;
          }
        } else if (val.length === 2) {
          const newArrDepth = arrDepth.concat(depth);
          bbb = `"${key}":["${val[0]}",${iter(val[1], depth + 1, newArrDepth)}]`;
        } else if (val.length === 3) {
          const newArrDepth = arrDepth.concat(depth);
          const withkav2 = typeof val[2] === 'string' ? `"${(val[2])}"` : `${(val[2])}`;
          bbb = `"${key}":["${val[0]}",${iter(val[1], depth + 1, newArrDepth)},${withkav2}]`;
        } else {
          const newArrDepth = arrDepth.concat(depth);
          bbb = `"${key}":${iter(val, depth + 1, newArrDepth)}`;
        }

        return bbb;
      });
    return [
      '{',
      ...lines,
      '}',
    ].join('');
  };

  return iter(value, 1);
};

export default toJson;
