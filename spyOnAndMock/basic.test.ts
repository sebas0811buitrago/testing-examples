import { assert, expect, test, vi } from 'vitest';
import * as operations from './operations';
import operation from './basic';

// Edit an assertion and save to see HMR in action

test('Operation', () => {
  const spySum = vi.spyOn(operations, 'sum');
  const spySquare = vi.spyOn(operations, 'default');
  expect(operation(2, 'square')).toBe(4);
  expect(operation(12, 'sum')).toBe(24);
  expect(spySum).toHaveBeenCalledWith(12, 12);
  expect(spySquare).toHaveBeenCalledWith(2);
});
