const WebSocket = require('ws');

/**
 * SignalR-compatible WebSocket hub implementation
 * Implements the basic SignalR protocol to maintain compatibility with the
 * @microsoft/signalr client library used by the frontend
 */
class MapHub {
  constructor() {
    this.wss = null;
    this.clients = new Set();
  }

  /**
   * Initialize the WebSocket server and attach to the HTTP server
   * @param {http.Server} server - The HTTP server to attach to
   */
  initialize(server) {
    this.wss = new WebSocket.Server({ 
      server,
      path: '/mapHub'
    });

    this.wss.on('connection', (ws, req) => {
      console.log('Client connected to /mapHub');
      this.clients.add(ws);

      // Handle SignalR handshake
      ws.on('message', (data) => {
        const message = data.toString();
        this.handleMessage(ws, message);
      });

      ws.on('close', () => {
        console.log('Client disconnected from /mapHub');
        this.clients.delete(ws);
      });

      ws.on('error', (err) => {
        console.error('WebSocket error:', err.message);
        this.clients.delete(ws);
      });
    });

    console.log('SignalR hub initialized at /mapHub');
  }

  /**
   * Handle incoming SignalR messages
   * @param {WebSocket} ws - The WebSocket connection
   * @param {string} message - The raw message string
   */
  handleMessage(ws, message) {
    // SignalR protocol uses \x1e as message separator
    const messages = message.split('\x1e').filter(m => m.length > 0);
    
    for (const msg of messages) {
      try {
        const parsed = JSON.parse(msg);
        
        // Handle handshake request
        if (parsed.protocol === 'json' && parsed.version === 1) {
          // Send handshake response (empty object)
          ws.send('{}\x1e');
          console.log('SignalR handshake completed');
        }
        
        // Handle ping
        if (parsed.type === 6) {
          // Ping response
          ws.send(JSON.stringify({ type: 6 }) + '\x1e');
        }
      } catch (e) {
        // Ignore parse errors for partial messages
      }
    }
  }

  /**
   * Broadcast an event to all connected clients using SignalR protocol
   * @param {string} methodName - The method name (e.g., "ReceiveEvent")
   * @param {*} data - The data to send
   */
  broadcast(methodName, data) {
    // SignalR invocation message format
    // type 1 = Invocation
    const message = JSON.stringify({
      type: 1,
      target: methodName,
      arguments: [data]
    }) + '\x1e';

    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }

  /**
   * Broadcast a ReceiveEvent message to all clients
   * @param {Object} event - The event object {siteId, typeId, latitude, longitude}
   */
  broadcastEvent(event) {
    this.broadcast('ReceiveEvent', event);
  }
}

module.exports = MapHub;
