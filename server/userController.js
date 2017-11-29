const R = require('ramda')
var _db = require('../models/db_models')
var authController = require('./authController')
var groups = new _db.Groups()
var messages = new _db.Messages()

const isEmptyString = R.pipe(
  R.defaultTo(''),
  R.trim,
  R.isEmpty
)

const saveGroup = (token, res) => {
  _db.Users.findById(token.id, (err, user) => { /**
    * locate user in DB with particular id
    */
    if (err) {
      res.json({ msg: err })
    } else if (String(user._id) === token.id) {
      groups._creator = token.id /**
       * add user_id as group creator from decoded token
       */
      groups.save((err) => {
        if (err) {
          res.json({ msg: err.message })
        } else {
          res.json({ msg: 'Group successfuly created' })
        }
      }) /** add group to DB */
    } else {
      res.json({ msg: 'Ooops! Unauthorised access!' })
    }
  })
}

const saveMember = (group, existingUser, res) => {
  group.members.push({ email: existingUser.email }) /**
  * add new member to existing group
  * email serves as the identifier
  */
  group.save((err) => {
    if (err) {
      res.json({ msg: 'Ooops! An error occured' })
    }
    res.json({ msg: existingUser.username + ' was successfully added' })
  }) /** update group info */
}

const verifyUser = (address, group, res) => {
  _db.Users.find((err, users) => {
    if (err) {
      res.json({ msg: 'Ooops! An error occured' })
    } else {
      var userFound = users.find((user) => {
        return user.email === address
      }) /**
       * check if user exists in the DB
       * returns user object if user exists
       */
      if (userFound) {
        res.json({ msg: 'Ooops! This particular user already exists' })
      } else {
        saveMember(group, userFound)
      }
    }
  })
}

module.exports = {
  validator: function (name, token) {
    var response
    var emptyInput = R.any(isEmptyString, [name])

    if (emptyInput) {
      response = 'Ooops! Group name cannot be empty'
    } else if (isEmptyString(token)) {
      response = 'Ooops! Unauthorised'
    } else {
      response = 'group input validation success'
    }
    return response
  },
  createGroup: function (name, token, res) {
    groups.name = R.trim(name)
    var decodedToken = authController.verifyToken(token) /** decode token and get payload */
    if (decodedToken.hasOwnProperty('id') === false) {
      res.json({ msg: 'Authorisation error' })
    } else {
      saveGroup(decodedToken, res)
    }
  },
  addUser: function (email, groupid, res) {
    var emptyData = R.any(isEmptyString, [email])
    if (emptyData) {
      res.json({ msg: 'Ooops! email cannot be empty' })
    } else {
      this.memberValidation(groupid, email, res) /**
       * validates that group and user exists
       * adds user to group's member list
       */
    }
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
  memberValidation: function (groupid, email, res) {
    _db.Groups.findById(groupid, (err, group) => {
      if (err) {
        res.json({ msg: 'An error occured' })
      } else if (group) {
        verifyUser(email, group, res)
      } else {
        res.json({ msg: 'Ooops! group does not exist' })
      }
    })
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
