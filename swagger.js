const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

const doc = {
    info: {
      title: 'User API',
      description: 'API documentation for User routes.',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const express = require('express');
    const app = express();

    // Import the generated Swagger JSON
    const swaggerDocument = require('./swagger.json');

    // Set dynamic host and schemes
    app.use('/api-docs', (req, res, next) => {
        const protocol = req.protocol; // 'http' or 'https'
        const host = req.get('host'); // Dynamic host

        // Update the Swagger document dynamically
        swaggerDocument.host = host;
        swaggerDocument.schemes = [protocol];

        req.swaggerDoc = swaggerDocument;
        next();
    }, swaggerUi.serve, swaggerUi.setup());

    app.listen(8080, () => {
        console.log('Server is running on port 8080.');
    });
});