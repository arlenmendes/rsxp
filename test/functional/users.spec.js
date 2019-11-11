const { test, trait } = use('Test/Suite')('Users')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

const userPayload = {
  name: 'Arlen Mateus Mendes',
  email: 'arlenmendes@gmail.com',
  avatar:
    'https://scontent-gru1-1.xx.fbcdn.net/v/t1.0-9/60882044_2164491543663665_8734450264301371392_n.jpg?_nc_cat=100&_nc_oc=AQmBXzoZKwnGfSyhaY6_iPwAhp6mDs5x02_JAv2VRbkdMI61qgOSHvqQXgwd-157br8&_nc_ht=scontent-gru1-1.xx&oh=38712090a4f6cceff570f786390b9033&oe=5E5E4667',
  linkedin: 'https://www.linkedin.com/in/arlenmsilva/',
  password: '123456',
  password_confirmation: '123456',
}

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('it should be able to create users', async ({ client }) => {
  const response = await client
    .post('/users')
    .send(userPayload)
    .accept('application/json')
    .end()

  response.assertStatus(201)
})

test('it should be able to validate email exists', async ({
  assert,
  client,
}) => {
  await Factory.model('App/Models/User').create({
    email: userPayload.email,
  })

  const response = await client
    .post('/users')
    .accept('application/json')
    .send(userPayload)
    .end()

  response.assertStatus(400)

  const objetcValidate = response.body.find(obj => obj.field === 'email')

  assert.equal(objetcValidate.message, 'email já está em uso.')
})

test('it should be able to show user data', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get(`/users/${user.id}`)
    .loginVia(user)
    .accept('application/json')
    .end()

  response.assertStatus(200)

  assert.equal(user.email, response.body.email)
})

test('it should be able to update users', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put(`/users/${user.id}`)
    .loginVia(user)
    .send(userPayload)
    .end()

  await user.reload()

  response.assertStatus(204)

  assert.equal(user.name, userPayload.name)
  assert.equal(user.email, userPayload.email)
})

test('it should be able to delete users', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete(`/users/${user.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(204)

  const userChecked = await User.find(user.id)

  assert.isNull(userChecked)
})
