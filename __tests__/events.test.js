const events = require('../src/data/events').default;

describe('Events Data', () => {
  test('events list should not be empty', () => {
    expect(events.length).toBeGreaterThan(0);
  });

  test('every event has id', () => {
    events.forEach((event) => {
      expect(event.id).toBeTruthy();
    });
  });

  test('every event has title', () => {
    events.forEach((event) => {
      expect(event.title).toBeTruthy();
    });
  });

  test('every event has location', () => {
    events.forEach((event) => {
      expect(event.location).toBeTruthy();
    });
  });

  test('every event has price', () => {
    events.forEach((event) => {
      expect(event.price).toBeTruthy();
    });
  });
});