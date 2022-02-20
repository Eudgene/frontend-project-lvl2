const stylish = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      if (currentValue === undefined) {
      return 'undefined';
      }
      return currentValue.toString();
    }
    if (currentValue === null) {
      return 'null';
    }
    //console.log(currentValue)
    const indentSize = depth * spacesCount;
    const currentIn = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const currentIndent = currentIn === undefined ? '' : currentIn;
    const lines = currentValue.map(({item, prefix, value, value2}) => {
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
          if (typeof value === 'object') {
            
            if (value2 !== undefined) {
              
              return `${currentIndent}${findPrefix(prefix)[0]}${item}: ${iter(value, depth + 2)}\n${currentIndent}${findPrefix(prefix)[1]}${item}: ${iter(value2, depth + 2)}`;
            }
            
            return `${currentIndent}${findPrefix(prefix)}${item}: ${iter(value, depth + 2)}`;
          } else {
            
            if (value2 !== undefined) {
              return `${currentIndent}${findPrefix(prefix)[0]}${item}: ${iter(value, depth + 2)}\n${currentIndent}${findPrefix(prefix)[1]}${item}: ${iter(value2, depth + 2)}`;
            }
            const val1 = typeof value === 'object' ? value : iter(value, depth + 2);
            return `${currentIndent}${findPrefix(prefix)}${item}: ${val1}`;
          }
        return ' ';
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
  /*const iter = (currentValue, depth) => {
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

  return iter(value, 1);*/
};

export default stylish;
