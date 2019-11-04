/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkshopSchema extends Schema {
  up() {
    this.create('workshops', table => {
      table.increments()
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.enu('section', [1, 2, 3]).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('workshops')
  }
}

module.exports = WorkshopSchema