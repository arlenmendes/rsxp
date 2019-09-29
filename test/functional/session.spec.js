'use strict'

const { test, trait } = use('Test/Suite')('Session')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const sessionPayload = {
  email: 'arlenmsilva@gmail.com',
  password: '123456',
}

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Token returned in session created', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create(sessionPayload)

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end()

  response.assertStatus(200)
})
