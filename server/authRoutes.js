var express = require('express')
const R = require('ramda')
var router = express.Router()
var authController = require('./authController')
var _db = require('../models/db_models')
var users = new _db.Users() /** new instance of the User model */

router.post('/signup', (req, res) => {
  var newUser = new authController.UserInfo(req.body.name, req.body.email, req.body.password, req.body.confirmPass) /**
   * create a new user object with user info
   */
  var response = authController.validateInput(newUser.name, newUser.email, newUser.password, newUser.confirmPass) /**
   * validate user input and check for edge-cases
   */
  if (response === 'success') {
    authController.save(users, newUser.name, newUser.email, newUser.password, res) /**
     * save users to mongoDB via MLab if all edge-cases pass
     */
  } else {
    res.json({ msg: response }) /**
     * send json response with input validation error info
     */
  }
})

router.post('/signin', (req, res) => {
  var userObj = R.omit(['email', 'confirmPass'], new authController.UserInfo())
  userObj.name = req.body.name
  userObj.password = req.body.password

  var response = authController.userAuth(userObj.name, userObj.password)

  res.json({ msg: response })
})

module.exports = router
