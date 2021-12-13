const toJson = (value) => {
  const arrDepth = [0];
  const iter = (currentValue, depth, arrDepth) => {
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
        if (depth <= arrDepth.pop()) {
          if (val.length === 2 ) {
            const newArr = _.last(arrDepth) === depth ? arrDepth: arrDepth.push(depth);
            bbb = `,"${key}":["${val[0]}",${iter(val[1], depth + 1, newArr)}]`;
          } else if (val.length === 3) {
            const withkav2 = typeof val[2] === 'string' ? `"${(val[2])}"` : `${(val[2])}`;
            const newArr = _.last(arrDepth) === depth ? arrDepth: arrDepth.push(depth);
            bbb = `,"${key}":["${val[0]}",${iter(val[1], depth + 1, newArr)},${withkav2}]`;
          } else {
            const newArr = _.last(arrDepth) === depth ? arrDepth: arrDepth.push(depth);
            bbb = `,"${key}":${iter(val, depth + 1, newArr)}`;
          }
        } else {
          if (val.length === 2 ) {
            const newArr = _.last(arrDepth) === depth ? arrDepth: arrDepth.push(depth);
            bbb = `"${key}":["${val[0]}",${iter(val[1], depth + 1, newArr)}]`;
          } else if (val.length === 3) {
            const newArr = _.last(arrDepth) === depth ? arrDepth: arrDepth.push(depth);
            const withkav2 = typeof val[2] === 'string' ? `"${(val[2])}"` : `${(val[2])}`;
            bbb = `"${key}":["${val[0]}",${iter(val[1], depth + 1, newArr)},${withkav2}]`;
          } else {
            const newArr = _.last(arrDepth) === depth ? arrDepth: arrDepth.push(depth);
            bbb = `"${key}":${iter(val, depth + 1, newArr)}`;
          }
        }
        return bbb;
      });
    return [
      '{',
      ...lines,
      `}`,
    ].join('');
  };
  
  return iter(value, 1, arrDepth);
};

export default toJson;