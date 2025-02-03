import { Ship } from './ship.js';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3); // Length 3
  });

  test('should initialize with correct length and health', () => {
    expect(ship.length).toBe(3);
    expect(ship.health).toBe(3);
  });

  test('should take a hit and reduce health', () => {
    ship.hit();
    expect(ship.health).toBe(2);
  });

  test('should sink when health reaches 0', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('should not sink if health is above 0', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});