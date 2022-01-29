import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const parse = (filePath, file) => {
  const extention = path.extname(filePath);
  if (extention === '.json') return JSON.parse(file);
};

const findDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(path.resolve(process.cwd(), filepath1));
  const file2 = readFileSync(path.resolve(process.cwd(), filepath2));

  const parsedFile1 = parse(filepath1, file1);
  const parsedFile2 = parse(filepath2, file2);

  const keysOfFile1 = Object.keys(parsedFile1);
  const keysOfFile2 = Object.keys(parsedFile2);

  const allSortedKeys = _.sortBy(_.union(keysOfFile1, keysOfFile2));

  const result = allSortedKeys.reduce((acc, key) => {
    if (parsedFile1.hasOwnProperty(key) && parsedFile2.hasOwnProperty(key)) {
      if (parsedFile1[key] === parsedFile2[key]) {
        acc[`  ${key}`] = parsedFile1[key];
      } else {
        acc[`- ${key}`] = parsedFile1[key];
        acc[`+ ${key}`] = parsedFile2[key];
      }
    } else if (parsedFile1.hasOwnProperty(key)) {
      acc[`- ${key}`] = parsedFile1[key];
    } else {
      acc[`+ ${key}`] = parsedFile2[key];
    }
    return acc;
  }, {});

  console.log(JSON.stringify(result, null, 2).replace(/["]+/g, ''));
  return JSON.stringify(JSON.stringify(result, null, 2).replace(/["]+/g, ''));
};

export default findDiff;
