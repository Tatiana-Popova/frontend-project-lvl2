import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatte from './formatters/index.js';
import createDifferencesTree from './createDifferencesTree.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath).toString();
  return data;
};

const findDifferences = (filepath1, filepath2, format = 'stylish') => {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);

  const file1AsObject = parse(path.extname(filepath1).slice(1), file1Content);
  const file2AsObject = parse(path.extname(filepath2).slice(1), file2Content);
  if (file1AsObject === null || file2AsObject === null) throw new Error('Format is not supported');
  const differences = createDifferencesTree(file1AsObject, file2AsObject);
  const result = formatte(differences, format);
  return result;
};

export default findDifferences;
