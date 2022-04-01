import stylish from './stylish.js';
import plain from './plain.js';

const format = (differences, style) => {
  switch (style) {
    case 'stylish':
      return stylish(differences);
    case 'plain':
      return plain(differences);
    case 'json':
      return JSON.stringify(differences, null, 2);
    default:
      throw new Error(`Format not supported: ${style}`);
  }
};

export default format;
