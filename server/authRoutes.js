const R = require('ramda')
var express = require('express')
var router = express.Router()
var authController = require('./authController')
var _db = require('../models/db_models')
var userModel = new _db.Users() /** new instance of the User model */

router.post('/signup', (req, res) => {
  var newUser = new authController.UserInfo(req.body.name, req.body.email, req.body.password, req.body.confirmPass) /**
   * create a new user object with user info
   */
  var response = authController.validateInput(newUser.name, newUser.email, newUser.password, newUser.confirmPass) /**
   * validate user input and check for edge-cases
   */
  if (response === 'success') {
    authController.save(_db.Users, userModel, newUser, res) /**
     * check if name already exists in DB
     * save new data to db if it does not exist
     */
  } else {
    res.json({ msg: response }) /**
     * send json response with input validation error info
     */
  }
})

router.post('/signin', (req, res) => {
  var userObj = R.omit(['confirmPass'], new authController.UserInfo()) /**
   * create new user object instance omitting some properties
   */
  userObj.email = req.body.email
  userObj.password = req.body.password
  userObj.name = req.body.name

  authController.userAuth(_db.Users, userObj, res) /**
   * handels user authentication
   */
})

module.exports = router
