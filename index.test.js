const fs = require('fs');
const mkdirp = require('mkdirp');

// https://github.com/facebook/jest/issues/3154#issuecomment-378184281
jest.mock('fs', () => new (require('metro-memory-fs'))());
beforeEach(() => require('fs').reset());

test('mkdirp.sync works', () => {
  expect(fs.existsSync('/foo')).toBe(false);
  mkdirp.sync('/foo');
  expect(fs.existsSync('/foo')).toBe(true);
});

test('mkdirp fails', (done) => {
  expect(fs.existsSync('/foo')).toBe(false);
  mkdirp('/foo', (err) => {
    expect(err).toBeFalsy();
    expect(fs.existsSync('/foo')).toBe(true);
    done();
  });
});
