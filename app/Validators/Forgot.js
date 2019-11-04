const Antl = use('Antl')

class Forgot {
  get rules() {
    return {
      email: 'required|email',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Forgot
