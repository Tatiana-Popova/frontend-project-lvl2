import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';

const createDifferencesObject = (object1, object2) => {
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
          children: createDifferencesObject(object1[key], object2[key]),
        };
      }
    }
    return acc;
  }, {});
  return differences;
};

const findDifferences = (filepath1, filepath2) => {
  const file1 = readFileSync(path.resolve(process.cwd(), filepath1));
  const file2 = readFileSync(path.resolve(process.cwd(), filepath2));

  const parsedFile1 = parse(filepath1, file1);
  const parsedFile2 = parse(filepath2, file2);
  const differences = createDifferencesObject(parsedFile1, parsedFile2);
  const result = stylish(differences);
  return result;
};

export default findDifferences;
