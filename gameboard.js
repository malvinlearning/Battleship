import { Ship } from './ship.js';

export class Gameboard {
    constructor() {
        this.ships = [
            new Ship(1),
            new Ship(2),
            new Ship(3),
            new Ship(4),
            new Ship(5)
        ];

        this.map = Array.from({ length: 5 }, () => Array(5).fill(0)); // 0 = empty, 1 = ship
        this.shipPositions = new Map(); // Track ship positions
    }

    // Check if all ships are sunk
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    placeShip(ship, x, y, direction) {
        // Check if the ship can be placed without overlapping
        if (this.isShipPlacementValid(ship.length, x, y, direction)) {
            if (direction === "horizontal") {
                for (let i = 0; i < ship.length; i++) {
                    this.map[y][x + i] = 1; // Mark cell as occupied by ship
                    this.shipPositions.set(`${x + i},${y}`, ship); // Store ship reference
                }
            } else if (direction === "vertical") {
                for (let i = 0; i < ship.length; i++) {
                    this.map[y + i][x] = 1; // Mark cell as occupied by ship
                    this.shipPositions.set(`${x},${y + i}`, ship); // Store ship reference
                }
            }
            console.log(`Ship placed at (${x}, ${y})`);
            return true; // Ship placement successful
        } else {
            console.log("Ship placement overlaps with another ship!");
            return false; // Ship placement failed
        }
    }

    isShipPlacementValid(length, x, y, direction) {
        if (direction === "horizontal") {
            if (x + length > 5) {
                console.log("Ship placement out of bounds!");
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (this.map[y][x + i] === 1) { // Check if cell is occupied
                    return false;
                }
            }
        } else if (direction === "vertical") {
            if (y + length > 5) {
                console.log("Ship placement out of bounds!");
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (this.map[y + i][x] === 1) { // Check if cell is occupied
                    return false;
                }
            }
        } else {
            console.log("Invalid direction! Use 'horizontal' or 'vertical'.");
            return false;
        }
        return true; // Ship placement is valid
    }

    receiveAttack(x, y) {
        if (this.map[y][x] === 1) { // Cell contains a ship
            const ship = this.shipPositions.get(`${x},${y}`);
            ship.hit(); // Call the ship's hit function
            console.log(`Hit at (${x}, ${y})! Ship health: ${ship.health}`);
            return true; // Return true for a hit
        } else {
            console.log(`Miss at (${x}, ${y})!`);
            return false; // Return false for a miss
        }
    }

    placeShipsRandomly() {
      const directions = ['horizontal', 'vertical'];
      const ships = this.gameboard.ships;

      ships.forEach(ship => {
          let isShip1Placed = false;
          while (!isShip1Placed) {
              const x = Math.floor(Math.random() * 5); // Random x coordinate (0-4)
              const y = Math.floor(Math.random() * 5); // Random y coordinate (0-4)
              const direction = directions[Math.floor(Math.random() * directions.length)]; // Random direction

              isShip1Placed = this.gameboard.placeShip(ship, x, y, direction);
              if (isShip1Placed) {
                  domOperation.updateGrid(5, 0, 4, 'horizontal'); // Update UI
              }
          }
      });
  }
}