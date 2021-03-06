const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    if (error.name === 'ModelNotFoundException') {
      return response.status(400).json({ errors: ['resoruce not found'] })
    }
    console.error(error)
    return response.status(error.status).json({ errors: ['Error in server'] })
  }
}

module.exports = ExceptionHandler
