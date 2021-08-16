import func from '../bin/gendiff.js';

test('func', () => {
    const str = 'hello';
    expect(func(str)).toEqual('olleh');
  })