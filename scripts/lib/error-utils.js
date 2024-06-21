
/**
 * Utility function for creating custom Error Types.  This means to bridge the gap with JS Errors and
 * the complex nature of creating a Typed Error
 * @param {string} type Error type (ex: TypeError, ValueError, SystemError, etc)
 * @param {string} message The message to be thrown
 */
function throwError(type, message) {
  const error = new Error(message)
  error.name = type

  throw error;
}

module.exports = () => ({
  throwError
})