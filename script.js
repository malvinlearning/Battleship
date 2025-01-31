import { DOM } from "./DOM.js";
import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

// Initialize gameboards
const playerGameboard = new Gameboard();
const computerGameboard = new Gameboard();

// Initialize DOM with both player and computer grids
const domOperation = new DOM('#player-container', '#computer-container', playerGameboard, computerGameboard);
domOperation.createGrids();

// Create player and computer instances
const player = new Player(playerGameboard);
const computerPlayer = new Player(computerGameboard);

// Place player's ships
const ship1 = playerGameboard.ships[0];
const isShip1Placed = playerGameboard.placeShip(ship1, 0, 0, 'vertical');
if (isShip1Placed) {
    domOperation.updateGrid(1, 0, 0, 'vertical'); // Update player's grid
}

const ship2 = playerGameboard.ships[1];
const isShip2Placed = playerGameboard.placeShip(ship2, 0, 1, 'horizontal');
if (isShip2Placed) {
    domOperation.updateGrid(2, 0, 1, 'horizontal'); // Update player's grid
}

const ship3 = playerGameboard.ships[3];
const isShip3Placed = playerGameboard.placeShip(ship3, 4, 0, 'vertical');
if (isShip3Placed) {
    domOperation.updateGrid(3, 4, 0, 'vertical'); // Update player's grid
}

const ship4 = playerGameboard.ships[3];
const isShip4Placed = playerGameboard.placeShip(ship4, 3, 0, 'vertical');
if (isShip4Placed) {
    domOperation.updateGrid(4, 3, 0, 'vertical'); // Update player's grid
}

const ship5 = playerGameboard.ships[4];
const isShip5Placed = playerGameboard.placeShip(ship5, 0, 4, 'horizontal');
if (isShip5Placed) {
    domOperation.updateGrid(5, 0, 4, 'horizontal'); // Update player's grid
}

// Place computer's ships randomly
computerPlayer.placeShipsRandomly();

console.log("Computer's ships placed randomly:", computerPlayer.gameboard.map);

// Track whose turn it is
let isPlayerTurn = true;

// Function to handle the end of the game
function checkGameOver() {
    if (playerGameboard.allShipsSunk()) {
        alert("Computer wins! All your ships are sunk.");
        return true;
    }
    if (computerGameboard.allShipsSunk()) {
        alert("You win! All computer's ships are sunk.");
        return true;
    }
    return false;
}

// Function to handle the computer's turn
function computerTurn() {
    if (checkGameOver()) return;

    // Computer makes a random move
    let x, y;
    do {
        x = Math.floor(Math.random() * 5);
        y = Math.floor(Math.random() * 5);
    } while (playerGameboard.map[y][x] === -1); // Ensure the cell hasn't been attacked before

    const isHit = playerGameboard.receiveAttack(x, y);
    const cell = domOperation.playerGrid[y][x];

    if (isHit) {
        cell.style.backgroundColor = "red"; // Hit: change to red
    } else {
        cell.style.backgroundImage = "url('x.png')"; // Path to your miss image
        cell.style.backgroundSize = "80%"; // Adjust the size of the image
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.backgroundPosition = "center"; // Center the image

        // Clear any existing content
        cell.textContent = ""; // Clear the "X"

        // Center the content (if needed)
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
    }

    // Switch back to the player's turn
    isPlayerTurn = true;
}

// Update the DOM's handleComputerCellClick to handle player's turn
domOperation.handleComputerCellClick = (x, y) => {
    if (!isPlayerTurn) return; // Do nothing if it's not the player's turn
    console.log('CLICKED');
    const cell = domOperation.computerGrid[y][x];
    if (cell.clicked) return; // Do nothing if the cell is already clicked

    // Mark the cell as clicked
    cell.clicked = true;

    // Call receiveAttack on the computer's gameboard
    const isHit = computerGameboard.receiveAttack(x, y);
    if (isHit) {
        cell.style.backgroundColor = "red"; // Hit: change to red
        cell.style.backgroundImage = "url('ship.png')"; // Path to your miss image
        cell.style.backgroundSize = "80%"; // Adjust the size of the image
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.backgroundPosition = "center"; // Center the image

        // Clear any existing content
        cell.textContent = ""; // Clear the "X"

        // Center the content (if needed)
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
    } else {
        cell.style.backgroundImage = "url('x.png')"; // Path to your miss image
        cell.style.backgroundSize = "80%"; // Adjust the size of the image
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.backgroundPosition = "center"; // Center the image

        // Clear any existing content
        cell.textContent = ""; // Clear the "X"

        // Center the content (if needed)
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
    }

    // Switch to the computer's turn
    isPlayerTurn = false;

    // Check if the game is over after the player's move
    if (!checkGameOver()) {
        setTimeout(computerTurn, 1000); // Delay computer's turn for 1 second
    }
};