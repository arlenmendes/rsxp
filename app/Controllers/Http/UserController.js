const Logger = use('Logger')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const userPayload = request.only([
      'name',
      'email',
      'linkedin',
      'avatar',
      'password',
    ])

    try {
      await User.create(userPayload)

      return response.created()
    } catch (error) {
      Logger.error('UserController-store ERROR => ', error)
      return response
        .status(500)
        .json({ errors: ['Erro ao cadastrar Usuário'] })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.params
   */
  async show({ params }) {
    const { id } = params

    const user = await User.findOrFail(id)

    return user
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {Request} ctx.request
   */
  async update({ params, request }) {
    const { id } = params

    const userPayload = request.only(['name', 'email', 'linkedin', 'avatar'])
    const password = request.input('password')

    if (password) {
      userPayload.password = password
    }

    const user = await User.findOrFail(id)

    user.merge(userPayload)

    await user.save()
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   */
  async destroy({ params }) {
    const { id } = params

    const user = await User.findOrFail(id)

    await user.delete()
  }
}

module.exports = UserController
