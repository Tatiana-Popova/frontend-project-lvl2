import _ from 'lodash';

const createDifferencesTree = (object1, object2) => {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const allSortedKeys = _.sortBy(_.union(object1Keys, object2Keys));

  const differences = allSortedKeys.reduce((acc, key) => {
    const doHaveBothObjectsAKey = _.has(object1, key) && _.has(object2, key);
    if (!doHaveBothObjectsAKey) {
      const [value, owner] = _.has(object1, key) ? [object1[key], 1] : [object2[key], 2];
      return {
        ...acc,
        [key]: {
          toSimpleCopy: true,
          key,
          value,
          owner,
        },
      };
    }
    const AreBothValuesObject = _.isObject(object1[key]) && _.isObject(object2[key]);
    const AreBothValuesArray = Array.isArray(object1[key]) && Array.isArray(object2[key]);
    if (!AreBothValuesObject) {
      return {
        ...acc,
        [key]: { toSimpleCopy: true, key, value: [object1[key], object2[key]] },
      };
    }
    if (AreBothValuesObject && !AreBothValuesArray) {
      return {
        ...acc,
        [key]: {
          toSimpleCopy: false,
          key,
          children: createDifferencesTree(object1[key], object2[key]),
        },
      };
    }
    return null;
  }, {});
  return differences;
};

export default createDifferencesTree;
