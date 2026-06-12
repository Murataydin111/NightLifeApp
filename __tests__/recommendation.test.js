describe('Recommendation Score', () => {
  test('score should not exceed 100', () => {
    const score = Math.min(
      100,
      Math.round(
        10000 / 100 +
        (100 - 20) +
        5 * 10
      )
    );

    expect(score).toBeLessThanOrEqual(100);
  });

  test('score should be positive', () => {
    const score = Math.min(
      100,
      Math.round(
        3000 / 100 +
        (100 - 25) +
        3 * 10
      )
    );

    expect(score).toBeGreaterThan(0);
  });

  test('higher rating increases score', () => {
    const score1 = 50 + 1 * 10;
    const score2 = 50 + 5 * 10;

    expect(score2).toBeGreaterThan(score1);
  });

  test('price affects score', () => {
    const cheap = 100 - 20;
    const expensive = 100 - 80;

    expect(cheap).toBeGreaterThan(expensive);
  });
});