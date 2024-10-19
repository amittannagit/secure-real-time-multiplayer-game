// Import the Player and Collectible classes from their respective modules
import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

// Connect to the server using Socket.IO
const socket = io(); 
// Create a new Player instance with a unique ID from the socket
const player = new Player(socket.id);
// Create an array of collectible items with at least one example collectible
const collectibles = [new Collectible('item1', 10, 100, 100)]; // Collectible with ID 'item1', value 10, positioned at (100, 100)

// Add an event listener for keydown events to handle player movement
document.addEventListener('keydown', (event) => {
    let direction = ''; // Initialize a variable to store the movement direction

    // Determine the movement direction based on the key pressed
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            direction = 'up'; // Move up if 'w' or up arrow is pressed
            break;
        case 's':
        case 'ArrowDown':
            direction = 'down'; // Move down if 's' or down arrow is pressed
            break;
        case 'a':
        case 'ArrowLeft':
            direction = 'left'; // Move left if 'a' or left arrow is pressed
            break;
        case 'd':
        case 'ArrowRight':
            direction = 'right'; // Move right if 'd' or right arrow is pressed
            break;
        default:
            console.log('Key not recognized'); // Log if the key pressed is not recognized
            return; // Exit the function if the key is invalid
    }

    // Move the player in the specified direction by 5 pixels
    player.movePlayer(direction, 5);
    // Emit the player's new position to the server
    socket.emit('playerMove', { id: player.id, x: player.x, y: player.y });
});

// Function to check for collisions with collectible items
function checkCollisions() {
    collectibles.forEach(collectible => {
        // Check if the player collides with the current collectible
        if (player.collision(collectible)) {
            // Log the collection event
            console.log(`Player ${player.id} collected ${collectible.id}`);
            player.score += collectible.value; // Increase the player's score by the collectible's value
            // Optionally remove the collectible from the game or perform other actions
        }
    });
}

// Set up a game loop to check for collisions every 100 milliseconds
setInterval(checkCollisions, 100);
