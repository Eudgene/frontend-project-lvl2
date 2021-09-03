let parse;
if (format === '') {
  parse = JSON.parse;
} else if (format === '.yml') {
  parse = yaml.safeLoad;
}

parse(data);