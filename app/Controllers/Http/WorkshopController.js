/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop')
/** @typedef {import('@adonisjs/')} Request */
const Logger = use('Logger')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class WorkshopController {
  /**
   * Show a list of all workshops.
   * GET workshops
   *
   * @param {object} ctx
   */
  async index() {
    const workshops = await Workshop.query()
      .with('user', builder => {
        builder.select(['id', 'name'])
      })
      .fetch()

    return workshops
  }

  /**
   * Show a single workshop.
   * GET workshops
   *
   * @param {object} ctx
   * @param {Request} ctx.params
   */
  async show({ params }) {
    const { id } = params

    const workshop = await Workshop.find(id)

    await workshop.load('user')

    return workshop
  }

  /**
   * Persiste a workshop.
   * POST workshops
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['title', 'description', 'section', 'userId'])

    try {
      const workshop = await Workshop.create(data)

      return response.status(201).json(workshop)
    } catch (error) {
      Logger.error('WorkshopController-store', error)
      return response
        .status(500)
        .json({ errors: ['Erro ao cadastrar Workshop'] })
    }
  }

  /**
   * Update a workshop.
   * PUT workshops
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   */
  async update({ params, request }) {
    const { id } = params
    const data = request.only(['title', 'description', 'section', 'userId'])

    const workshop = await Workshop.find(id)

    workshop.merge(data)

    await workshop.save()
  }

  /**
   * Persiste a workshop.
   * POST workshops
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async destroy({ params }) {
    const { id } = params

    const workshop = await Workshop.find(id)

    await workshop.delete()
  }
}

module.exports = WorkshopController
