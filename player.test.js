import { Player } from './player.js';
import { Gameboard } from './gameboard.js';

describe('Player', () => {
  let player;
  let opponentGameboard;

  beforeEach(() => {
    const gameboard = new Gameboard();
    player = new Player(gameboard);
    opponentGameboard = new Gameboard();
  });

  test('should place ships randomly', () => {
    player.placeShipsRandomly();
    const shipsPlaced = player.gameboard.ships.every(ship => ship.health === ship.length);
    expect(shipsPlaced).toBe(true);
  });
});