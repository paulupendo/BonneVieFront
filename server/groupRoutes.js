var express = require('express')
var router = express.Router()
var groupController = require('./groupController')
var messageController = require('./messageController')
var userController = require('./userController')

router.post('/group', (req, res) => {
  var name = req.body.groupname
  var token = req.body.token
  var group = new groupController.NewGroup(name) /**
   * new group object from constructor
   */
  var response = userController.validator(group.name, token) /**
   * handles input validation
   */
  if (response === 'group input validation success') {
    userController.createGroup(group.name, token, res) /**
     * save group to DB
     */
  } else {
    res.json({ msg: response })
  }
})

router.put('/group/:groupId/user', (req, res) => {
  var email = req.body.email
  var groupId = req.params.groupId
  userController.addUser(email, groupId, res)
})

router.post('/group/:groupId/message', (req, res) => {
  var message = req.body.content
  // var group_id = req.params.groupId
  var messageObj = new messageController.NewMessage(message)
  userController.createMesssage(messageObj.content, res)
})

module.exports = router
