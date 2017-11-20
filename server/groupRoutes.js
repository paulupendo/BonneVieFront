var express = require('express')
var router = express.Router()
var groupController = require('./groupController')

router.post('/group', (req, res) => {
  var name = req.body.groupname
  var group = new groupController.NewGroup(name)
  var message = groupController.validator(group.name)
  res.json({ msg: message })
})

module.exports = router
