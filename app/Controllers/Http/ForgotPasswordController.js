'use strict'
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const Mail = use('Mail')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

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

      console.log(token)

      await user.tokens().create({
        token,
        type: 'forgotpassword',
      })

      await Mail.send('emails.forgotpassword', { name: user.name }, message => {
        message
          .to(user.email)
          .from('nao-responda@arlen.com.br')
          .subject('Recuperação de senha')
      })
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = ForgotPasswordController
