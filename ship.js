export class Ship {
    constructor(length) {
        this.length = length;
        this.health = length; // Health equals ship length
    }

    hit() {
        if (this.health > 0) {
            this.health--;
        }
        if (this.health === 0) {
            console.log("Ship sunk!");
        }
    }

    isSunk() {
        return this.health === 0;
    }
}