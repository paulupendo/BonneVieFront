const R = require('ramda')
const isEmptyString = R.pipe(
  R.defaultTo(''),
  R.trim,
  R.isEmpty
)

module.exports = {
  NewGroup: function (name) {
    this.name = name
  },
  validator: function (name) {
    var response
    var emptyInput = R.any(isEmptyString, [name])
    if (emptyInput) {
      response = 'Ooops! Group name cannot be empty'
    } else {
      response = name + ' group successfuly created'
    }
    return response
  }
}
