const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Import Swagger documentation
const swaggerDocument = require('./swagger/swagger.json');

// Setup Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sync Sequelize models
sequelize
    .sync({ force: false }) // Set `force: true` to drop and recreate tables if necessary
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((err) => {
        console.error('Error synchronizing models:', err);
    });

// Import routes
const userRoutes = require('./routes/user_routes');

// Use routes under the `/api` prefix
app.use('/api', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
