import _ from 'lodash';

const refineTheSyntaxOfValue = (value) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return value;
      return '[complex value]';
    case 'boolean':
      return value;
    case 'number':
      return value;
    default:
      return `'${value}'`;
  }
};

const plain = (value) => {
  const iter = (currentValue, keyPath) => {
    const objectKeys = Object.keys(currentValue);
    const lines = objectKeys.map((key) => {
      if (currentValue[key].toSimpleCopy === true) {
        if (!Array.isArray(currentValue[key].value)) {
          if (currentValue[key].owner === 2) {
            const addedValue = refineTheSyntaxOfValue(currentValue[key].value);
            return `Property '${keyPath}${key}' was added with value: ${addedValue}`;
          }
          return `Property '${keyPath}${key}' was removed`;
        }
      }
      if (_.isArray(currentValue[key].value)) {
        const value1 = currentValue[key].value[0];
        const value2 = currentValue[key].value[1];
        if (value1 !== value2) {
          return `Property '${keyPath}${key}' was updated. From ${refineTheSyntaxOfValue(
            value1,
          )} to ${refineTheSyntaxOfValue(value2)}`;
        }
        return 'same';
      }
      return iter(currentValue[key].children, `${keyPath}${key}.`);
    });
    return [...lines].filter((line) => line !== 'same').join('\n');
  };
  return iter(value, '');
};

export default plain;
