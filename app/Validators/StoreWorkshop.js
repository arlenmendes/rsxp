const { rule } = use('Validator')
const Antl = use('Antl')

class StoreWorkshop {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      title: 'required',
      description: 'required',
      userId: 'exists:users,id',
      section: [rule('required'), rule('in', [1, 2, 3])],
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = StoreWorkshop
