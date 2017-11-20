const R = require('ramda')
module.exports = {
  NewGroup: function (name) {
    this.name = name
  },
  validator: function (name) {
    var response
    const isEmptyString = R.pipe(
      R.defaultTo(''),
      R.trim,
      R.isEmpty
    )
    var emptyInput = R.any(isEmptyString, [name])
    if (emptyInput) {
      response = 'Ooops! Group name cannot be empty'
    } else {
      response = name + ' group successfuly created'
    }
    return response
  }
}
