import action from '../bin/gendiff.js';

test('action', () => {
    expect(action(filepath1, filepath2)).toEqual('olleh');
})