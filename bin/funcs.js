import * as fs from 'fs';
import * as path from 'path';

const takeObjectFromJson = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readJson = JSON.parse(read);
  return readJson;
};

export default takeObjectFromJson;
