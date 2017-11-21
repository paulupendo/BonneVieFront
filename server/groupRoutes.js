var express = require('express')
var router = express.Router()
var groupController = require('./groupController')
var userController = require('./userController')

router.post('/group', (req, res) => {
  var name = req.body.groupname
  var group = new groupController.NewGroup(name) /**
   * new group object from constructor
   */
  var response = userController.validator(group.name) /**
   * handles input validation
   */
  if (response === 'group input validation success') {
    userController.createGroup(group.name, res) /**
     * save group to DB
     */
  } else {
    res.json({ msg: response })
  }
})

module.exports = router
