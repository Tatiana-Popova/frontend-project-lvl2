import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import createDifferencesTree from './createDifferencesTree.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath).toString();
  return data;
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const findDifferences = (filepath1, filepath2, style = 'stylish') => {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);

  const file1AsObject = parse(getFileFormat(filepath1), file1Content);
  const file2AsObject = parse(getFileFormat(filepath2), file2Content);
  const differences = createDifferencesTree(file1AsObject, file2AsObject);
  const result = format(differences, style);
  return result;
};

export default findDifferences;
