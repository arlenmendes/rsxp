class SessionController {
  /**
   *
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */

  async store({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])

    const token = await auth.attempt(email, password)

    return response.ok(token)
  }
}

module.exports = SessionController
