const Antl = use('Antl')

class StoreUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = StoreUser
