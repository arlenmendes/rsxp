/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    avatar: faker.url({ extensions: ['jpg', 'png'] }),
    linkedin: faker.url({ domain: 'www.linkedin.com/in' }),
    password: faker.string({ length: 8 }),
    ...data,
  }
})

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || `refrashtoken`,
    token: faker.string({ length: 24 }),
    ...data,
  }
})

Factory.blueprint('App/Models/Workshop', (faker, i, data = {}) => {
  return {
    title: faker.sentence({ words: 5 }),
    description: faker.paragraph({ sentences: 4 }),
    section: faker.integer({ min: 1, max: 3 }),
    ...data,
  }
})
