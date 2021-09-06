export const parsFunc = (pathFile) => {
  const format = path.extname(pathFile);
  let result;
  if (format === '.json') {
    result = JSON.parse(pathFile);
  } else if (format === '.yml' || format === '.yaml') {
    result = yaml.safeLoad(pathFile);
  }
  return result;
}
