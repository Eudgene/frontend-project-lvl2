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
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const findPrefix = (item) => {
          if (item === 'added') {
            return '+ ';
          }
          if (item === 'removed') {
            return '- ';
          }
          if (item === 'updated') {
            return ['- ', '+ '];
          }
          return '  ';
        };
        if (val.length === 2) {
          return `${currentIndent}${findPrefix(val[0])}${key}: ${iter(val[1], depth + 2)}`;
        }
        if (val.length === 3) {
          const prefix1 = findPrefix(val[0])[0];
          const prefix2 = findPrefix(val[0])[1];
          return `${currentIndent}${prefix1}${key}: ${iter(val[1], depth + 2)}\n${currentIndent}${prefix2}${key}: ${iter(val[2], depth + 2)}`;
        }
        if (val.length !== 3 && val.length !== 2) {
          return `${currentIndent}  ${key}: ${iter(val, depth + 2)}`;
        }
        return '';
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
