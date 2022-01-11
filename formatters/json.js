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

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (depth <= _.last(arrDepth)) {
          arrDepth.concat(depth);
          if (val.length === 2) {
            //arrDepth.push(depth);
            return `,"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)}]`;
          }
          if (val.length === 3) {
            //arrDepth.push(depth);
            return `,"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)},${iter(val[2], depth + 1, arrDepth)}]`;
          }
          if (val.length !== 3 && val.length !== 2) {
            //arrDepth.push(depth);
            return `,"${key}":${iter(val, depth + 1, arrDepth)}`;
          }
        }
        if (val.length === 2) {
          arrDepth.push(depth);
          return `"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)}]`;
        }
        if (val.length === 3) {
          arrDepth.push(depth);
          const withkav2 = typeof val[2] === 'string' ? `"${(val[2])}"` : `${(val[2])}`;
          return `"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)},${withkav2}]`;
        }
        if (val.length !== 3 && val.length !== 2) {
          arrDepth.push(depth);
          return `"${key}":${iter(val, depth + 1, arrDepth)}`;
        }
        return '';
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
