const { test, trait } = use('Test/Suite')('Workshops')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Workshop = use('App/Models/Workshop')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

const workshopPayload = {
  title: 'Desenvolvimento com NodeJS',
  description: 'Descricao de um workshop super legal',
  section: 2,
}

test('it should be able to create workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/workshops')
    .accept('application/json')
    .loginVia(user)
    .send({ ...workshopPayload, userId: user.id })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.id)
})

test('It should be able to list workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const workshop = await Factory.model('App/Models/Workshop').create({
    userId: user.id,
  })

  const response = await client
    .get('/workshops')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body[0].id, workshop.id)
  assert.equal(response.body[0].user.id, user.id)
})

test('It should be able to show single workshop', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()

  const workshop = await Factory.model('App/Models/Workshop').create({
    userId: user.id,
  })

  const response = await client
    .get(`/workshops/${workshop.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.id, workshop.id)
  assert.equal(response.body.user.id, user.id)
})

test('It should be able to update a workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const workshop = await Factory.model('App/Models/Workshop').create({
    userId: user.id,
  })

  const response = await client
    .put(`/workshops/${workshop.id}`)
    .loginVia(user)
    .send(workshopPayload)
    .end()

  response.assertStatus(204)

  await workshop.reload()

  assert.equal(workshop.title, workshopPayload.title)
  assert.equal(workshop.description, workshopPayload.description)
})

test('It should be able to delete workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const workshop = await Factory.model('App/Models/Workshop').create({
    userId: user.id,
  })

  const response = await client
    .delete(`/workshops/${workshop.id}`)
    .loginVia(user)
    .send(workshopPayload)
    .end()

  response.assertStatus(204)

  const workshopChecked = await Workshop.find(workshop.id)

  assert.isNull(workshopChecked)
})
