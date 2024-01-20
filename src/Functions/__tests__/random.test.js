import { getRandomIndex } from "../random";

test('Random function returns an integer in array range', () => {
  expect(getRandomIndex([1,2,3], new Date())).toBeGreaterThan(0)
  expect(getRandomIndex([1,2,3], new Date())).toBeLessThan(3)
});