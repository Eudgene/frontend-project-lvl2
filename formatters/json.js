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
        if (depth <= arrDepth.pop()) {
          if (val.length === 2) {
            arrDepth.push(depth);
            bbb = `,"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)}]`;
          } else if (val.length === 3) {
            arrDepth.push(depth);
            bbb = `,"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)},${iter(val[2], depth + 1, arrDepth)}]`;
          } else {
            arrDepth.push(depth);
            bbb = `,"${key}":${iter(val, depth + 1, arrDepth)}`;
          }
        } else if (val.length === 2) {
          arrDepth.push(depth);
          bbb = `"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)}]`;
        } else if (val.length === 3) {
          arrDepth.push(depth);
          const withkav2 = typeof val[2] === 'string' ? `"${(val[2])}"` : `${(val[2])}`;
          bbb = `"${key}":["${val[0]}",${iter(val[1], depth + 1, arrDepth)},${withkav2}]`;
        } else {
          arrDepth.push(depth);
          bbb = `"${key}":${iter(val, depth + 1, arrDepth)}`;
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
