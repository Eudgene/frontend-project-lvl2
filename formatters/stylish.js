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
    let bbb = {};
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const findPrefix = (item) => {
          let prefix = '  ';
          if (item === `added`) {
            prefix = '+ ';
          } else if (item === `removed`) {
            prefix = '- ';
          } else if (item === `updated`) {
            prefix = ['- ', '+ '];
          }
          return prefix;
        };
        if (val.length === 2 ) {
          bbb = `${currentIndent}${findPrefix(val[0])}${key}: ${iter(val[1], depth + 2)}`;
        } else if (val.length === 3) {
          bbb = `${currentIndent}${findPrefix(val[0])[0]}${key}: ${iter(val[1], depth + 2)}\n${currentIndent}${findPrefix(val[0])[1]}${key}: ${val[2]}`;
        } else {
          bbb = `${currentIndent}  ${key}: ${iter(val, depth + 2)}`;
        }
        return bbb;
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
