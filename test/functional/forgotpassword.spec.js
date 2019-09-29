'use strict'

const { test, trait } = use('Test/Suite')('forgot password')

const Mail = use('Mail')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const forgotPayload = {
  email: 'arlenmsilva@gmail.com',
}

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should send email with reset password instructions', async ({
  assert,
  client,
}) => {
  Mail.fake()

  const user = await Factory.model('App/Models/User').create(forgotPayload)

  const response = await client
    .post('/forgot')
    .send(forgotPayload)
    .end()

  response.assertStatus(204)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, forgotPayload.email)

  const tokens = await user.tokens().fetch()

  console.log(tokens.toJSON())
})
