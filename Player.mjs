// Define the Player class to represent each player in the game
class Player {
    // Constructor method to initialize the player with a unique ID
    constructor(id) {
        this.id = id; // Unique ID for the player
        this.score = 0; // Initial score for the player, starting at 0
        this.x = 0; // Initial X coordinate for the player's position
        this.y = 0; // Initial Y coordinate for the player's position
    }

    // Method to move the player in a specified direction by a certain number of pixels
    movePlayer(direction, pixels) {
        console.log(`Moving player ${this.id} ${direction} by ${pixels}px`); // Log the movement action

        // Switch case to determine the direction of movement
        switch (direction) {
            case 'up':
                this.y -= pixels; // Move up by decreasing the Y coordinate
                break;
            case 'down':
                this.y += pixels; // Move down by increasing the Y coordinate
                break;
            case 'left':
                this.x -= pixels; // Move left by decreasing the X coordinate
                break;
            case 'right':
                this.x += pixels; // Move right by increasing the X coordinate
                break;
            default:
                console.error('Invalid direction:', direction); // Log an error for invalid direction
        }

        // Log the new position of the player after movement
        console.log(`New position of player ${this.id}: (${this.x}, ${this.y})`);
    }

    // Method to calculate the player's rank among other players
    calculateRank(players) {
        // Sort players by score in descending order (highest score first)
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        // Find the index of the current player in the sorted array and add 1 for rank
        const currentRanking = sortedPlayers.findIndex(player => player.id === this.id) + 1;
        const totalPlayers = players.length; // Total number of players in the game
        // Return a string representing the player's rank
        return `Rank: ${currentRanking}/${totalPlayers}`;
    }

    // Method to check for collision between the player and a collectible item
    collision(collectible) {
        // Calculate the distance between the player and the collectible using the Pythagorean theorem
        const distance = Math.hypot(this.x - collectible.x, this.y - collectible.y);
        // Check if the distance is less than the collectible's radius to detect a collision
        if (distance < collectible.radius) {
            console.log(`Collision detected between player ${this.id} and collectible ${collectible.id}`); // Log collision
            return true; // Return true if a collision occurs
        }
        return false; // Return false if no collision occurs
    }
}

// Export the Player class as the default export
export default Player;
