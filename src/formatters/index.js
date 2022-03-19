import stylish from './stylish.js';
import plain from './plain.js';

const formatte = (differences, format) => {
  switch (format) {
    case 'stylish':
      return stylish(differences);
    case 'plain':
      return plain(differences);
    case 'json':
      return JSON.stringify(differences, null, 2);
    default:
      throw new Error('Format error', format);
  }
};

export default formatte;
