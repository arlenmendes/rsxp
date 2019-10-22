'use strict'
const { randomBytes } = require('crypto')
const { promisify } = require('util')

const { isBefore, parseISO, subHours } = require('date-fns')

const Env = use('Env')
const Mail = use('Mail')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token')

class ForgotPasswordController {
  /**
   *
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store({ request }) {
    try {
      const email = request.input('email')

      const user = await User.findByOrFail({ email })

      const random = await promisify(randomBytes)(24)
      const token = random.toString('hex')

      await user.tokens().create({
        token,
        type: 'forgotpassword',
      })

      const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`

      await Mail.send(
        'emails.forgotpassword',
        { name: user.name, resetPasswordUrl },
        message => {
          message
            .to(user.email)
            .from('nao-responda@arlen.com.br')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      console.error(err)
    }
  }

  async reset({ request }) {
    const { token, password } = request.only(['token', 'password'])

    const tokenObject = await Token.query()
      .where('token', token)
      .where('type', 'forgotpassword')
      .first()

    if (isBefore(parseISO(tokenObject.createdAt), subHours(new Date(), 2))) {
      return response
        .status(400)
        .json({ errors: ['Token expired. Please try again!'] })
    }

    const user = await tokenObject.user().fetch()

    user.password = password

    await user.save()
  }
}

module.exports = ForgotPasswordController
