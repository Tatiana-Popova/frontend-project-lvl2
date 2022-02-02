import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const parse = (filePath, file) => {
  const extention = path.extname(filePath);
  if (extention === '.json') return JSON.parse(file);
  return null;
};

const findDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(path.resolve(process.cwd(), filepath1));
  const file2 = readFileSync(path.resolve(process.cwd(), filepath2));
  const parsedFile1 = parse(filepath1, file1);
  const parsedFile2 = parse(filepath2, file2);

  const keysOfFile1 = Object.keys(parsedFile1);
  const keysOfFile2 = Object.keys(parsedFile2);

  const allSortedKeys = _.sortBy(_.union(keysOfFile1, keysOfFile2));
  if (allSortedKeys.length === 0) return '{}';
  const differences = allSortedKeys.reduce((acc, key) => {
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      if (parsedFile1[key] === parsedFile2[key]) {
        acc.push(`    ${key}: ${parsedFile1[key]}`);
      } else {
        acc.push(`  - ${key}: ${parsedFile1[key]}`);
        acc.push(`  + ${key}: ${parsedFile2[key]}`);
      }
    } else if (_.has(parsedFile1, key)) {
      acc.push(`  - ${key}: ${parsedFile1[key]}`);
    } else {
      acc.push(`  + ${key}: ${parsedFile2[key]}`);
    }
    return acc;
  }, []);

  const result = '{\n'.concat(differences.join(',\n')).concat('\n}');
  console.log(result);
  return result;
};

export default findDiff;
