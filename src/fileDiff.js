import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import formatte from './formatters/index.js';

const createDifferencesTree = (object1, object2) => {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const allSortedKeys = _.sortBy(_.union(object1Keys, object2Keys));
  const differences = allSortedKeys.reduce((acc, key) => {
    const doHaveBothObjectsAKey = _.has(object1, key) && _.has(object2, key);
    if (!doHaveBothObjectsAKey) {
      const [value, owner] = _.has(object1, key) ? [object1[key], 1] : [object2[key], 2];
      acc[key] = {
        toSimpleCopy: true,
        key,
        value,
        owner,
      };
    } else {
      const AreBothValuesObject = _.isObject(object1[key]) && _.isObject(object2[key]);
      const AreBothValuesArray = Array.isArray(object1[key]) && Array.isArray(object2[key]);
      if (!AreBothValuesObject) {
        acc[key] = { toSimpleCopy: true, key, value: [object1[key], object2[key]] };
      } else if (AreBothValuesObject && !AreBothValuesArray) {
        acc[key] = {
          toSimpleCopy: false,
          key,
          children: createDifferencesTree(object1[key], object2[key]),
        };
      }
    }
    return acc;
  }, {});
  return differences;
};

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath).toString();
  return data;
};

const findDifferences = (filepath1, filepath2, format = 'stylish') => {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);

  const file1AsObject = parse(filepath1, file1Content);
  const file2AsObject = parse(filepath2, file2Content);
  if (file1AsObject === null || file2AsObject === null) throw new Error('Format is not supported');
  const differences = createDifferencesTree(file1AsObject, file2AsObject);
  const result = formatte(differences, format);
  return result;
};

export default findDifferences;
