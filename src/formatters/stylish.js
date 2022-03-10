import _ from 'lodash';

const stringify = (value, externaldepth, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + spacesCount)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, externaldepth + spacesCount);
};

const stylish = (value, replacer = ' ', spacesCount = 2) => {
  const insignias = ['  ', '- ', '+ '];
  const iter = (currentValue, depth) => {
    const objectKeys = Object.keys(currentValue);
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = objectKeys.reduce((acc, key) => {
      if (currentValue[key].toSimpleCopy === true) {
        if (!Array.isArray(currentValue[key].value)) {
          const insignia = currentValue[key].owner === 1 ? insignias[1] : insignias[2];
          acc.push(
            `${currentIndent}${insignia}${key}: ${stringify(currentValue[key].value, depth)}`,
          );
        }
        if (Array.isArray(currentValue[key].value)) {
          const value1 = currentValue[key].value[0];
          const value2 = currentValue[key].value[1];
          if (value1 === value2) {
            acc.push(`${currentIndent}${insignias[0]}${key}: ${stringify(value1, depth)}`);
          } else {
            acc.push(`${currentIndent}${insignias[1]}${key}: ${stringify(value1, depth)}`);
            acc.push(`${currentIndent}${insignias[2]}${key}: ${stringify(value2, depth)}`);
          }
        }
      } else if (currentValue[key].toSimpleCopy === false) {
        acc.push(
          `${currentIndent}${insignias[0]}${key}: ${iter(
            currentValue[key].children,
            depth + spacesCount,
          )}`,
        );
      }
      return acc;
    }, []);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, 1);
};

export default stylish;
