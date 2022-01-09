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
        const makeTree = ([k, v], d) => {
          if (v.length === 2) {
            return `${currentIndent}${findPrefix(v[0])}${k}: ${iter(v[1], d + 2)}`;
          }
          if (v.length === 3) {
            const prefix1 = findPrefix(v[0])[0];
            const prefix2 = findPrefix(v[0])[1];
            return `${currentIndent}${prefix1}${k}: ${iter(v[1], d + 2)}\n${currentIndent}${prefix2}${k}: ${iter(v[2], d + 2)}`;
          }
          if (v.length !== 3 && v.length !== 2) {
            return `${currentIndent}  ${k}: ${iter(v, d + 2)}`;
          }
        };
        const finishedTree = makeTree([key, val], depth);
        return finishedTree;
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
