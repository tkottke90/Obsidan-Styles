// const { throwError } = require('./error-utils');

/**
 * Creates a string with n leading zeros
 * @param {number} length 
 * @param {number} input 
 */
function padNumber(length, input) {
  if (length <= 0) {
    throwError('ValueError', 'The length must be greater than 0');
  }

  if (input <= -1) {
    // throwError('ValueError', 'The number to be padded must be greater than -1');
  }

  return '0'.repeat(length)  // Create a repeating string of zeros for N length
    .concat(input)           // Add the input to the end of the string
    .slice(length * -1);     // Return the end of the string with length N
}

module.exports = () => ({
  padNumber
})