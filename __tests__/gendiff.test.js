import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

import findDifferences from '../src/fileDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filesToCheck = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
  ['wrongFormatFile.png'],
];
const resultFiles = ['stylishResult.txt', 'plainResult.txt', 'jsonResult.txt'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getAbsolutePaths = (fixtures) => {
  const absolutePaths = fixtures.map((filename) => {
    if (!_.isArray(filename)) {
      return getFixturePath(filename);
    }
    return getAbsolutePaths(filename);
  });
  return absolutePaths;
};

const absoluteFilePaths = getAbsolutePaths(filesToCheck);
const absoluteResultPaths = getAbsolutePaths(resultFiles);

const results = absoluteResultPaths.map((resultPath) => readFileSync(resultPath, 'utf-8'));

test('STYLISH', () => {
  expect(findDifferences(absoluteFilePaths[0][0], absoluteFilePaths[0][1], 'stylish')).toBe(
    results[0],
  );
  expect(findDifferences(absoluteFilePaths[1][0], absoluteFilePaths[1][1], 'stylish')).toBe(
    results[0],
  );
});

test('PLAIN', () => {
  expect(findDifferences(absoluteFilePaths[0][0], absoluteFilePaths[0][1], 'plain')).toBe(
    results[1],
  );
  expect(findDifferences(absoluteFilePaths[1][0], absoluteFilePaths[1][1], 'plain')).toBe(
    results[1],
  );
});

test('JSON', () => {
  expect(findDifferences(absoluteFilePaths[0][0], absoluteFilePaths[0][1], 'json')).toBe(
    results[2],
  );
  expect(findDifferences(absoluteFilePaths[1][0], absoluteFilePaths[1][1], 'json')).toBe(
    results[2],
  );
});

test('ERRORS', () => {
  expect(() => findDifferences(absoluteFilePaths[2][0], absoluteFilePaths[2][0])).toThrow(
    'Format is not supported',
  );
  expect(() => findDifferences(absoluteFilePaths[0][0], absoluteFilePaths[0][1], 'other')).toThrow(
    'Format not supported: other',
  );
});
