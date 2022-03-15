import _ from 'lodash';

const refineTheSyntaxOfValue = (value) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return value;
      return '[complex value]';
    case 'boolean':
      return value;
    default:
      return `'${value}'`;
  }
};

const plain = (value) => {
  const iter = (currentValue, keyPath) => {
    const objectKeys = Object.keys(currentValue);
    const lines = objectKeys.reduce((acc, key) => {
      if (currentValue[key].toSimpleCopy === true) {
        if (!Array.isArray(currentValue[key].value)) {
          if (currentValue[key].owner === 2) {
            const addedValue = refineTheSyntaxOfValue(currentValue[key].value);
            acc.push(`Property '${keyPath}${key}' was added with value: ${addedValue}`);
          } else {
            acc.push(`Property '${keyPath}${key}' was removed`);
          }
        }
        if (_.isArray(currentValue[key].value)) {
          const value1 = currentValue[key].value[0];
          const value2 = currentValue[key].value[1];
          if (value1 !== value2) {
            acc.push(
              `Property '${keyPath}${key}' was updated. From ${refineTheSyntaxOfValue(
                value1,
              )} to ${refineTheSyntaxOfValue(value2)}`,
            );
          }
        }
      } else if (currentValue[key].toSimpleCopy === false) {
        acc.push(iter(currentValue[key].children, `${keyPath}${key}.`));
      }
      return acc;
    }, []);
    return [...lines].join('\n');
  };
  return iter(value, '');
};

export default plain;
