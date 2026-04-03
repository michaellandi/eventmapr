const express = require('express');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const configurationRouter = require('./routes/configuration');
const eventRouter = require('./routes/event');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EventMapr',
      version: 'v1',
      description: 'Real-time event visualization API'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ]
  },
  apis: [path.join(__dirname, 'routes', '*.js')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Create and configure the Express application
 * @returns {express.Application} The configured Express app
 */
function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Swagger documentation - JSON spec must be defined before UI middleware
  app.get('/swagger/v1/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API routes
  app.use('/api/configuration', configurationRouter);
  app.use('/api/event', eventRouter);

  // Static files (served from public/ directory)
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Fallback for SPA routing - serve index.html for unmatched routes
  app.get('*', (req, res, next) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/') || req.path.startsWith('/swagger')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  return app;
}

module.exports = createApp;
