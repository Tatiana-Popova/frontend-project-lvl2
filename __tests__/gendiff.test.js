import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { path, dirname } from 'path';
// import path from 'path';

import findDiff from '../src/fileDiff.js';

let filePath1 = '';
let filePath2 = '';
let emptyFilePath = '';
let result = '';

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  filePath1 = getFixturePath('testFile1.json');
  filePath2 = getFixturePath('testFile2.json');
  emptyFilePath = getFixturePath('emptyFile.json');
  const resultPath = getFixturePath('result.txt');

  result = readFileSync(resultPath, 'utf8');
});

test('differenceFinder', () => {
  expect(findDiff(filePath1, filePath2)).toEqual(result);
  expect(findDiff(emptyFilePath, emptyFilePath)).toEqual('{}');
});
