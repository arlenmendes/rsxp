const { test, trait } = use('Test/Suite')('forgot password')

const Mail = use('Mail')
const Hash = use('Hash')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

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

  await client
    .post('/forgot')
    .send(forgotPayload)
    .end()

  const token = await user.tokens().first()
  const recentEmail = Mail.pullRecent()

  assert.equal(recentEmail.message.to[0].address, forgotPayload.email)

  assert.include(token.toJSON(), { type: 'forgotpassword' })

  Mail.restore()
})

test('it should be able to reset password.', async ({ assert, client }) => {
  const password = '123456'

  const user = await Factory.model('App/Models/User').create(forgotPayload)
  const userToken = await Factory.model('App/Models/Token').make({
    type: `forgotpassword`,
  })

  await user.tokens().save(userToken)

  const response = await client
    .patch('/reset')
    .send({ token: userToken.token, password, password_confirmation: password })
    .end()

  response.assertStatus(204)

  await user.reload()

  const checkPassword = await Hash.verify(password, user.password)

  assert.isTrue(checkPassword)
})
