'use strict'

const { test, trait } = use('Test/Suite')('Forgot password')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const userData = {
  email: 'arlenmsilva@gmail.com',
  password: '123456',
  username: 'arlenmendes',
}

trait('Test/ApiClient')

test('it should send email with reset password instructions', async ({
  assert,
  client,
}) => {})
