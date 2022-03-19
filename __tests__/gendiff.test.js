import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import findDifferences from '../src/fileDiff.js';

let jsonPath1 = '';
let jsonPath2 = '';

let ymlPath1 = '';
let ymlPath2 = '';

let stylishResult = '';
let plainResult = '';
let jsonResult = '';

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  jsonPath1 = getFixturePath('recursiveFile1.json');
  jsonPath2 = getFixturePath('recursiveFile2.json');
  ymlPath1 = getFixturePath('recursiveFile1.yml');
  ymlPath2 = getFixturePath('recursiveFile2.yml');
  const stylishResultTxt = getFixturePath('recursiveResult.txt');
  const plainResultTxt = getFixturePath('recursiveResultPlain.txt');
  const jsonResultTxt = getFixturePath('recursiveResultJson.txt');

  stylishResult = readFileSync(stylishResultTxt, 'utf-8');
  plainResult = readFileSync(plainResultTxt, 'utf-8');
  jsonResult = readFileSync(jsonResultTxt, 'utf-8');
});

test('findDifferenceJSON', () => {
  expect(findDifferences(jsonPath1, jsonPath2, 'stylish')).toEqual(stylishResult);
  expect(findDifferences(jsonPath1, jsonPath2, 'plain')).toEqual(plainResult);
  expect(findDifferences(jsonPath1, jsonPath2, 'json')).toEqual(jsonResult);
});

test('findDifferenceYAML', () => {
  expect(findDifferences(ymlPath1, ymlPath2, 'stylish')).toEqual(stylishResult);
  expect(findDifferences(ymlPath1, ymlPath2, 'plain')).toEqual(plainResult);
  expect(findDifferences(ymlPath1, ymlPath2, 'json')).toEqual(jsonResult);
});
