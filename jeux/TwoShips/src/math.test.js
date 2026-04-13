import {randFloatSpread, mapLinear, lerp, clamp, randFloat} from './math.js';

describe('randFloatSpread', () => {
  test('résultat <= 1 pour range 1', () => {
    const result = randFloatSpread(1);
    expect(result).toBeLessThanOrEqual(1);
  });
  test('résultat >= -1 pour range 1', () => {
    const result = randFloatSpread(1);
    expect(result).toBeGreaterThanOrEqual(-1);
  });
});

describe('mapLinear', () => {
  test('mapLinear(1,2,3,4,5) should return 3', () => {
    const result = mapLinear(1, 2, 3, 4, 5);
    expect(result).toBe(3);
  });
  test('mapLinear(1,20,3,40,5) should return 0.882352941176471', () => {
    const result = mapLinear(1, 20, 3, 40, 5);
    expect(result).toBeCloseTo(0.882352941176471);
  });
});

describe('lerp', () => {
  test('lerp(1,3,20) should return 41', () => {
    const result = lerp(1, 3, 20);
    expect(result).toBe(41);
  });
  test('lerp(1.3,-7,2) should return -15.3', () => {
    const result = lerp(1.3, -7, 2);
    expect(result).toBeCloseTo(-15.3);
  });
});

describe('clamp', () => {
  test('clamp(5,1,10) should return in interval [1,10]', () => {
    const result = clamp(5, 1, 10);
    expect(result).toBe(5);
  });
  test('clamp(15,1,10) should return maximum value 10', () => {
    const result = clamp(15, 1, 10);
    expect(result).toBe(10);
  });
  test('clamp(-5,1,10) should return minimum value 1', () => {
    const result = clamp(-5, 1, 10);
    expect(result).toBe(1);
  });
});

describe('randFloat', () => {
  test('randFloat(1,10) should return a number in interval [1,10]', () => {
    const result = randFloat(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
  test('randFloat(100,200) should return number between 100 and 200', () => {
    const result = randFloat(100, 200);
    expect(result).toBeGreaterThanOrEqual(100);
    expect(result).toBeLessThanOrEqual(200);
  });
});
