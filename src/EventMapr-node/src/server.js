const http = require('http');
const createApp = require('./app');
const MapHub = require('./hub');
const eventRouter = require('./routes/event');

const PORT = process.env.PORT || 5000;

// Create Express app
const app = createApp();

// Create HTTP server
const server = http.createServer(app);

// Initialize SignalR-compatible WebSocket hub
const mapHub = new MapHub();
mapHub.initialize(server);

// Connect the hub's broadcast function to the event router
eventRouter.setBroadcastFunction((event) => {
  mapHub.broadcastEvent(event);
});

// Start the server
server.listen(PORT, () => {
  console.log(`EventMapr server running on http://localhost:${PORT}`);
  console.log(`Swagger documentation at http://localhost:${PORT}/swagger`);
  console.log(`SignalR hub available at ws://localhost:${PORT}/mapHub`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
