import stylish from './stylish.js';
import plain from './plain.js';

const formatte = (differences, format) => {
  switch (format) {
    case 'stylish':
      return stylish(differences);
    case 'plain':
      return plain(differences);
    default:
      throw new Error('Format error', format);
  }
};

export default formatte;
