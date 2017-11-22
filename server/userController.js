const R = require('ramda')
var _db = require('../models/db_models')
var groups = new _db.Groups()
var messages = new _db.Messages()

const isEmptyString = R.pipe(
  R.defaultTo(''),
  R.trim,
  R.isEmpty
)

module.exports = {
  validator: function (name) {
    var response
    var emptyInput = R.any(isEmptyString, [name])

    if (emptyInput) {
      response = 'Ooops! Group name cannot be empty'
    } else {
      response = 'group input validation success'
    }
    return response
  },
  createGroup: function (name, res) {
    groups.name = R.trim(name)
    groups.save((err) => {
      if (err) {
        res.json({ msg: err.message })
      } else {
        res.json({ msg: 'Group successfuly created' })
      }
    })
  },
  sendInvites: function (name, groupName) {
    // Add users to group
  },
  createMesssage: function (_content, res) {
    messages.content = _content
    messages.save((err) => {
      if (err) {
        res.json({ msg: err.message })
      } else {
        res.json({ msg: 'Message posted successfuly' })
      }
    })
    // create new message
  },
  deleteGroup: function () {
    // delete group
  },
  deleteMessage: function () {
    // delete messages
  },
  updateGroup: function () {
    // update group name
  },
  updateMessage: function () {
    // update message
  }
}
