const { ServiceProvider } = require('@adonisjs/fold')

class CustomValidatorProvider extends ServiceProvider {
  async exists(data, field, message, args, get) {
    const Database = use('Database')

    const value = get(data, field)
    const [table, column] = args

    const row = await Database.table(table)
      .where(column, value)
      .first()
    if (!row) {
      throw message
    }
  }

  boot() {
    const Validator = use('Validator')
    Validator.extend('exists', this.exists.bind(this))
  }
}

module.exports = CustomValidatorProvider
