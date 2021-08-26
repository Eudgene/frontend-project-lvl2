import * as fs from 'fs';
import * as path from 'path';

const takeObjectFromJson = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readJson = JSON.parse(read);
  return readJson;
};

export const newResd = (startArray, finArray ) => {
  startArray.map((item) => {
    if (arr2.includes(item)) {
      if (json1[item] === json2[item]) {
        finArray.push(`  ${item}: ${json1[item]}`);
      } else {
        if (json1[item]) {
          finArray.push(`- ${item}: ${json1[item]}`);
          finArray.push(`+ ${item}: ${json2[item]}`);
        } else {
          finArray.push(`+ ${item}: ${json2[item]}`);
        }
      }
    } else {
      finArray.push(`- ${item}: ${json1[item]}`);
    }
  })
  return finArray;
};

export default takeObjectFromJson;
