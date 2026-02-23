const express = require('express');
const { getSettings } = require('../config');
const { DEMO_COORDINATES } = require('../constants');
const { getRandomElement, toLowerCamelCase } = require('../utils');

const router = express.Router();

// Reference to the hub's broadcast function (set during app initialization)
let broadcastEvent = null;

/**
 * Set the broadcast function for the SignalR hub
 * @param {Function} fn - The broadcast function
 */
function setBroadcastFunction(fn) {
  broadcastEvent = fn;
}

/**
 * @swagger
 * /api/event:
 *   post:
 *     summary: Post an event
 *     description: Broadcasts an event to all connected WebSocket clients
 *     tags:
 *       - Event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - typeId
 *               - latitude
 *               - longitude
 *             properties:
 *               siteId:
 *                 type: string
 *                 description: Site identifier (optional - if present, draws a line)
 *               typeId:
 *                 type: string
 *                 description: Event type identifier
 *               latitude:
 *                 type: number
 *                 description: Event latitude
 *               longitude:
 *                 type: number
 *                 description: Event longitude
 *     responses:
 *       200:
 *         description: Event broadcasted successfully
 */
router.post('/', (req, res) => {
  const event = req.body;
  
  if (broadcastEvent) {
    broadcastEvent(event);
  }
  
  res.sendStatus(200);
});

/**
 * @swagger
 * /api/event/Demo:
 *   post:
 *     summary: Generate demo events
 *     description: Generates random events and broadcasts them to all connected clients
 *     tags:
 *       - Event
 *     parameters:
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Number of events to generate
 *       - in: query
 *         name: eventClass
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Event class filter (0=Line with siteId, 1=Marker without siteId)
 *     responses:
 *       200:
 *         description: Demo events generation started
 */
router.post('/Demo', async (req, res) => {
  const count = parseInt(req.query.count) || 100;
  const eventClass = req.query.eventClass !== undefined ? parseInt(req.query.eventClass) : null;
  
  const settings = getSettings();
  const sites = settings.Sites;
  const types = Object.keys(settings.Types);
  
  // Start generating events asynchronously
  res.sendStatus(200);
  
  for (let i = 0; i < count; i++) {
    const coords = getRandomElement(DEMO_COORDINATES);
    const eventClassValue = eventClass !== null ? eventClass : Math.floor(Math.random() * 2);
    
    const event = {
      siteId: eventClassValue === 1 ? null : toLowerCamelCase(getRandomElement(sites).Name),
      typeId: toLowerCamelCase(getRandomElement(types)),
      latitude: coords[0],
      longitude: coords[1]
    };
    
    if (broadcastEvent) {
      broadcastEvent(event);
    }
    
    // Random delay between 0-500ms (matching C# implementation)
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500)));
  }
});

module.exports = router;
module.exports.setBroadcastFunction = setBroadcastFunction;
