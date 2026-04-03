/**
 * Get a random element from an array
 * @param {Array} arr - The array to pick from
 * @returns {*} A random element from the array
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Convert a string to lowerCamelCase (first char lowercase)
 * Matches the C# ToLowerCamelCase extension method
 * @param {string} s - The string to convert
 * @returns {string} The string with first character lowercased
 */
function toLowerCamelCase(s) {
  if (!s || s.length === 0) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * Deep transform all object keys to camelCase
 * Used to transform PascalCase config to camelCase for API responses
 * @param {*} obj - The object to transform
 * @returns {*} Object with camelCase keys
 */
function toCamelCaseKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCaseKeys(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const result = {};
    for (const key of Object.keys(obj)) {
      const camelKey = toLowerCamelCase(key);
      result[camelKey] = toCamelCaseKeys(obj[key]);
    }
    return result;
  }
  return obj;
}

module.exports = {
  getRandomElement,
  toLowerCamelCase,
  toCamelCaseKeys
};
