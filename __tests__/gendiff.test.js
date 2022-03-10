import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// import path from 'path';

import findDifferences from '../src/fileDiff.js';

let jsonPath1 = '';
let jsonPath2 = '';

let ymlPath1 = '';
let ymlPath2 = '';

let result = '';

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  jsonPath1 = getFixturePath('recursiveFile1.json');
  jsonPath2 = getFixturePath('recursiveFile2.json');
  ymlPath1 = getFixturePath('recursiveFile1.yml');
  ymlPath2 = getFixturePath('recursiveFile2.yml');
  const resultJson = getFixturePath('recursiveResult.txt');

  result = readFileSync(resultJson, 'utf-8');
});

test('findDifferenceJSON', () => {
  expect(findDifferences(jsonPath1, jsonPath2)).toEqual(result);
});

test('findDifferenceYAML', () => {
  expect(findDifferences(ymlPath1, ymlPath2)).toEqual(result);
});
