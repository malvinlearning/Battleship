export class DOM {
    constructor(playerContainerSelector, computerContainerSelector, playerGameboard, computerGameboard) {
        this.playerContainer = document.querySelector(playerContainerSelector);
        this.computerContainer = document.querySelector(computerContainerSelector);
        this.playerGameboard = playerGameboard; // Player's gameboard
        this.computerGameboard = computerGameboard; // Computer's gameboard
        this.playerGrid = Array.from({ length: 5 }, () => Array(5).fill(null)); // Player's grid
        this.computerGrid = Array.from({ length: 5 }, () => Array(5).fill(null)); // Computer's grid

        this.shipColors = {
            1: "cyan",   // Length 1: Cyan
            2: "green",  // Length 2: Green
            3: "yellow", // Length 3: Yellow
            4: "orange", // Length 4: Orange
            5: "blue"    // Length 5: Blue
        };
    }

    // Create both player and computer grids
    createGrids() {
        this.createGrid(this.playerContainer, this.playerGrid, this.playerGameboard, false); // Player's grid (show ships)
        this.createGrid(this.computerContainer, this.computerGrid, this.computerGameboard, true); // Computer's grid (hide ships)
    }

    // Generic grid creation function
    createGrid(container, grid, gameboard, isComputerGrid) {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const cell = document.createElement("div");
                cell.classList.add("child");
                cell.dataset.x = x; // Store coordinates
                cell.dataset.y = y;
                cell.clicked = false; // Add a clicked property

                // Add click event listener (only for computer's grid)
                if (isComputerGrid) {
                    cell.addEventListener("click", () => {
                        this.handleComputerCellClick(x, y);
                    });
                }

                container.appendChild(cell);
                grid[y][x] = cell; // Store reference to the cell
            }
        }
    }

    // Handle clicks on the computer's grid
    handleComputerCellClick(x, y) {
        const cell = this.computerGrid[y][x];
        if (cell.clicked) {
            return; // Do nothing if the cell is already clicked
        }
    
        // Mark the cell as clicked
        cell.clicked = true;
    
        // Call receiveAttack on the computer's gameboard
        const isHit = this.computerGameboard.receiveAttack(x, y);
        if (isHit) {
            cell.style.backgroundColor = "red"; // Hit: change to red
        } else {
            // Set the background image for the miss
            cell.style.backgroundImage = "url('miss.png')"; // Path to your miss image
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
    }

    // Update the grid (for player's ships)
    updateGrid(length, x, y, direction) {
        const color = this.shipColors[length]; // Get color based on ship length
        if (direction === "horizontal") {
            for (let i = 0; i < length; i++) {
                if (y < 5 && x + i < 5) { // Check bounds
                    const cell = this.playerGrid[y][x + i];
                    cell.style.backgroundColor = color; // Set background color
                    cell.classList.add("ship"); // Add the ship class
                }
            }
        } else if (direction === "vertical") {
            for (let i = 0; i < length; i++) {
                if (y + i < 5 && x < 5) { // Check bounds
                    const cell = this.playerGrid[y + i][x];
                    cell.style.backgroundColor = color; // Set background color
                    cell.classList.add("ship"); // Add the ship class
                }
            }
        }
    }
}