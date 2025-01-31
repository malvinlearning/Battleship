import { Gameboard } from "./gameboard.js";
import { DOM } from "./DOM.js";
export class Player {
  constructor(gameboard) {
      this.gameboard = gameboard;
  }

  attack(x, y) {
      this.gameboard.receiveAttack(x, y);
  }

  // Computer AI logic for random attack
  makeRandomMove(opponent) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      opponent.gameboard.receiveAttack(x, y);
  }

  placeShipsRandomly() {
      const directions = ['horizontal', 'vertical'];
      const ships = this.gameboard.ships;

      ships.forEach(ship => {
          let placed = false;
          while (!placed) {
              const x = Math.floor(Math.random() * 5); // Random x coordinate (0-4)
              const y = Math.floor(Math.random() * 5); // Random y coordinate (0-4)
              const direction = directions[Math.floor(Math.random() * directions.length)]; // Random direction

              placed = this.gameboard.placeShip(ship, x, y, direction);
          }
      });
  }
}