import yaml from 'js-yaml';
import path from 'path';

const parse = (filePath, file) => {
  const extention = path.extname(filePath);
  switch (extention) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      return null;
  }
};

export default parse;
