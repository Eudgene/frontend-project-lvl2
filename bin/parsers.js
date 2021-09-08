import * as path from 'path';

export const parsFunc = (file, pathFile) => {
  const format = path.extname(pathFile);
  let result;
  if (format === '.json') {
    result = JSON.parse(file);
  } else if (format === '.yml' || format === '.yaml') {
    result = yaml.safeLoad(file);
  }
  return result;
}