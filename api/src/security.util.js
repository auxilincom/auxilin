const crypto = require('crypto');
const bcrypt = require('bcrypt');

/**
 * @desc Generates random string, useful for creating secure tokens
 *
 * @return {string} - random string
 */
exports.generateSecureToken = async () => {
  const buf = crypto.randomBytes(48);
  return buf.toString('hex');
};

/**
 * @desc Generate hash from any string. Could be used to generate a hash from password
 *
 * @param text {string} - a text to produce hash from
 * @param salt {string}
 * @return {Promise} - a hash from input text
 */
exports.getHash = (text, salt = '') => {
  return bcrypt.hash(`${text[0]}${salt}${text.slice(1)}`, 10);
};

/**
 * @desc Generate salt
 * @return {string}
 */
exports.generateSalt = async () => {
  return bcrypt.genSalt(10);
};

/**
 * @desc Compares if text and hash are equal
 *
 * @param text {string} - a text to compare with hash
 * @param hash {string} - a hash to compare with text
 * @param salt {string} - a salt which will add to password
 * @return {Promise} - are hash and text equal
 */
exports.compareTextWithHash = (text, hash, salt = '') => {
  return bcrypt.compare(`${text[0]}${salt}${text.slice(1)}`, hash);
};

/**
 * @desc Generate salt using sha256
 *
 * @param {string} text
 * @param {string} shaSecret
 * @return {string}
 */
exports.generateShaHash = (text, shaSecret) => {
  return crypto
    .createHmac('sha256', shaSecret)
    .update(text)
    .digest('hex');
};
