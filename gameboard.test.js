import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should initialize with a 5x5 map', () => {
    expect(gameboard.map.length).toBe(5);
    expect(gameboard.map[0].length).toBe(5);
  });

  test('should place a ship horizontally', () => {
    const ship = gameboard.ships[0]; // Length 1
    const placed = gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(placed).toBe(true);
    expect(gameboard.map[0][0]).toBe(1);
  });

  test('should place a ship vertically', () => {
    const ship = gameboard.ships[1]; // Length 2
    const placed = gameboard.placeShip(ship, 0, 0, 'vertical');
    expect(placed).toBe(true);
    expect(gameboard.map[0][0]).toBe(1);
    expect(gameboard.map[1][0]).toBe(1);
  });

  test('should not place a ship out of bounds', () => {
    const ship = gameboard.ships[2]; // Length 3
    const placed = gameboard.placeShip(ship, 3, 0, 'horizontal');
    expect(placed).toBe(false);
  });

  test('should not place a ship on top of another ship', () => {
    const ship1 = gameboard.ships[0]; // Length 1
    gameboard.placeShip(ship1, 0, 0, 'horizontal');
    const ship2 = gameboard.ships[1]; // Length 2
    const placed = gameboard.placeShip(ship2, 0, 0, 'horizontal');
    expect(placed).toBe(false);
  });

  test('should receive an attack and hit a ship', () => {
    const ship = gameboard.ships[0]; // Length 1
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    const isHit = gameboard.receiveAttack(0, 0);
    expect(isHit).toBe(true);
    expect(ship.health).toBe(0);
  });

  test('should receive an attack and miss', () => {
    const isHit = gameboard.receiveAttack(0, 0);
    expect(isHit).toBe(false);
  });

  test('should check if all ships are sunk', () => {
    const ship = gameboard.ships[0]; // Length 1
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});