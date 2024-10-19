// Define the Collectible class to represent collectible items in the game
class Collectible {
    // Constructor to initialize the collectible's properties
    constructor(id, value, x, y) {
        this.id = id; // Unique ID for the collectible, used to identify it in the game
        this.value = value; // Value of the collectible, which can be added to the player's score upon collection
        this.x = x; // X coordinate of the collectible's position on the game canvas
        this.y = y; // Y coordinate of the collectible's position on the game canvas
        this.radius = 10; // Radius for collision detection; this determines the hit area for collecting the item
    }
}

// Export the Collectible class for use in other modules
export default Collectible;
