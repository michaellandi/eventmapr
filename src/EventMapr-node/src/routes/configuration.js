const express = require('express');
const { getSettingsCamelCase } = require('../config');

const router = express.Router();

/**
 * @swagger
 * /api/configuration:
 *   get:
 *     summary: Get application configuration
 *     description: Returns the map, types, and sites configuration in camelCase format
 *     tags:
 *       - Configuration
 *     responses:
 *       200:
 *         description: Configuration object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 map:
 *                   type: object
 *                   properties:
 *                     lineDuration:
 *                       type: number
 *                     markerDuration:
 *                       type: number
 *                     markerHeight:
 *                       type: number
 *                     markerWidth:
 *                       type: number
 *                     theme:
 *                       type: string
 *                     divId:
 *                       type: string
 *                     centerLatitude:
 *                       type: number
 *                     centerLongitude:
 *                       type: number
 *                     zoom:
 *                       type: string
 *                     apiKey:
 *                       type: string
 *                     legendTitle:
 *                       type: string
 *                     siteIcon:
 *                       type: string
 *                     siteHeight:
 *                       type: number
 *                     siteWidth:
 *                       type: number
 *                 types:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                 sites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       latitude:
 *                         type: number
 *                       longitude:
 *                         type: number
 */
router.get('/', (req, res) => {
  res.json(getSettingsCamelCase());
});

module.exports = router;
