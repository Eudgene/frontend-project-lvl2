import * as fs from 'fs';
import * as path from 'path';

const takeObjectFromJson = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readJson = JSON.parse(read);
  return readJson;
};

export const newResd = (startArray, finArray, js1, js2) => {
  const arr2 = Object.keys(js2);
  startArray.map((item) => {
    if (arr2.includes(item)) {
      if (js1[item] === js2[item]) {
        finArray.push(`  ${item}: ${js1[item]}`);
      } else {
        if (js1[item]) {
          finArray.push(`- ${item}: ${js1[item]}`);
          finArray.push(`+ ${item}: ${js2[item]}`);
        } else {
          finArray.push(`+ ${item}: ${js2[item]}`);
        }
      }
    } else {
      finArray.push(`- ${item}: ${js1[item]}`);
    }
  })
  return finArray;
};

export default takeObjectFromJson;
