const fs = require('fs');
const path = require('path');
const { toCamelCaseKeys } = require('./utils');

/**
 * Load configuration from file
 * Uses EVENTMAPR_CONFIG_PATH env var if set, otherwise falls back to default
 * @returns {Object} The loaded configuration (PascalCase keys)
 */
function loadConfig() {
  const configPath = process.env.EVENTMAPR_CONFIG_PATH || 
    path.join(__dirname, '..', 'config', 'default.json');
  
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (err) {
    console.error(`Failed to load config from ${configPath}:`, err.message);
    throw err;
  }
}

// Load config once at startup
const config = loadConfig();

/**
 * Get settings in camelCase format for API responses
 * @returns {Object} Settings with camelCase keys
 */
function getSettingsCamelCase() {
  return toCamelCaseKeys(config);
}

/**
 * Get raw settings (PascalCase keys) for internal use
 * @returns {Object} Settings with PascalCase keys
 */
function getSettings() {
  return config;
}

module.exports = {
  getSettings,
  getSettingsCamelCase,
  loadConfig
};
