const plain = (value) => {
    let newString;
    let bbb = [];
    const iter = (currentValue, stringWay = '', depth = 0) => {
      const lines = Object
        .entries(currentValue)
        .map(([key, val]) => {
            const arr = stringWay.split('.');
            if (arr.length !== depth) {
              arr.splice(arr.length - 1, 1);
              stringWay = arr.join('.');
            }
            let wayInString = stringWay === '' ? key : `.${key}`;
            if (val[0] === 'added') {
              bbb.push(`Property '${stringWay}${wayInString}' was added with value: ${valueInString(val[1])}`);
            } else if (val[0] === 'removed') {
              bbb.push(`Property '${stringWay}${wayInString}' was removed`);
            } else if (val[0] === 'updated') {
              bbb.push(`Property '${stringWay}${wayInString}' was updated. From ${valueInString(val[1])} to ${valueInString(val[2])}`);
            } else if (val[0] === 'notChanged') {
                if (typeof val[1] === 'object') {
                  previus = stringWay;
                  let newString = stringWay === '' ? key : stringWay += `.${key}`;
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
