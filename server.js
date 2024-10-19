require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser to parse request bodies
const expect = require('chai'); // Import Chai for assertions in tests
const socket = require('socket.io'); // Import Socket.IO for real-time communication
const cors = require('cors'); // Import CORS for enabling cross-origin requests
const helmet = require('helmet'); // Import Helmet for security

const fccTestingRoutes = require('./routes/fcctesting.js'); // Import testing routes for FCC
const runner = require('./test-runner.js'); // Import test runner

const app = express(); // Create an Express application

// Use Helmet for enhanced security
app.use(helmet());

// Serve static files from the /public directory
app.use('/public', express.static(process.cwd() + '/public'));
// Serve static files from the /assets directory
app.use('/assets', express.static(process.cwd() + '/assets'));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for testing purposes (allows requests from any origin)
app.use(cors({ origin: '*' }));

// Prevent MIME type sniffing
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Set header to prevent MIME type sniffing
    next(); // Call the next middleware
});

// Prevent caching by setting appropriate headers
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); // Disable caching
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0
    res.setHeader('Expires', '0'); // Prevent caching in HTTP 1.1
    res.setHeader('Surrogate-Control', 'no-store'); // Prevent caching in reverse proxies
    next(); // Call the next middleware
});

// Set the X-Powered-By header to indicate the server is using PHP 7.4.3
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'PHP 7.4.3'); // Set the X-Powered-By header
    next(); // Call the next middleware
});

// Define the route for the index page (serving static HTML)
app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/views/index.html'); // Send the index.html file
    });

// Use FCC testing routes
fccTestingRoutes(app);

// Middleware for handling 404 Not Found errors
app.use(function(req, res, next) {
    res.status(404) // Set the response status to 404
        .type('text') // Set the response type to text
        .send('Not Found'); // Send a 'Not Found' message
});

// Define the port number to listen on (default is 3000)
const portNum = process.env.PORT || 3000;

// Set up the server and run tests if in test mode
const server = app.listen(portNum, () => {
    console.log(`Listening on port ${portNum}`); // Log the listening port
    if (process.env.NODE_ENV === 'test') {
        console.log('Running Tests...'); // Log test execution
        setTimeout(function () {
            try {
                runner.run(); // Run the tests
            } catch (error) {
                console.log('Tests are not valid:'); // Log if tests fail
                console.error(error); // Log the error
            }
        }, 1500);
    }
});

// Initialize Socket.IO for real-time communication
const io = socket(server);
io.on('connection', (socket) => {
    console.log('A player connected:', socket.id); // Log player connection
});

// Export the app for testing
module.exports = app; // For testing
