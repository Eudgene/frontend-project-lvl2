const stylish = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) {
      return 'null';
    }

    const indentSize = depth * spacesCount;
    const currentIn = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const currentIndent = currentIn === undefined ? '' : currentIn;
    let result = {};
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (val.length === 2) {
          result = `${currentIndent}${val[0]}${key}: ${iter(val[1], depth + 2)}`;
        } else if (val.length === 4) {
          result = `${currentIndent}${val[0]}${key}: ${iter(val[2], depth + 2)}\n${currentIndent}${val[1]}${key}: ${val[3]}`;
        } else {
          result = `${currentIndent}  ${key}: ${iter(val, depth + 2)}`;
        }
        return result;
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
