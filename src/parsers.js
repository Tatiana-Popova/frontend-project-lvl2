import yaml from 'js-yaml';

const parse = (fileExtname, file) => {
  switch (fileExtname) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      return null;
  }
};

export default parse;
