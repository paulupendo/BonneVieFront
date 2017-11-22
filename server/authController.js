const R = require('ramda')
var jwt = require('jsonwebtoken')
var _secret = process.env.SECRET

const isEmptyString = R.pipe(/** function composition with Ramda */
  R.defaultTo(''),
  R.trim,
  R.isEmpty
) /** use ramda fp for input validation */

module.exports = {
  UserInfo: function (name, email, password, confirmPass) { /** user object constructor */
    this.name = name
    this.email = email
    this.password = password
    this.confirmPass = confirmPass
  },
  validateInput: function (name, email, password, confirmPassword) { /** validate user input */
    var message
    var regx = /^[a-z0-9]+@[a-z0-9]+(?:\.[a-z0-9])/ /**
     * email matching regExp
     */
    var emptyField = R.any(isEmptyString, [name, email, password, confirmPassword]) /**
     * returns boolean after cheking if input is empty
     */
    if (emptyField) {
      message = 'Ooops! All fields are required for you to sign up'
    } else if (!regx.test(email)) {
      message = 'Ooops! Please enter a valid email address'
    } else if (password.length <= 8) {
      message = 'Ooops! Passwords must have more than 8 characters'
    } else if (password !== confirmPassword) {
      message = 'Ooops! Passwords do not match'
    } else {
      message = 'success'
    }
    return message
  },
  userAuth: function (usersModel, userObj, res) { /** signin handler */
    var emptyField = R.any(isEmptyString, [userObj.name, userObj.password])

    if (emptyField) {
      res.json({ msg: 'Ooops! All input fields are required' })
    } else if (userObj.password.length <= 8) {
      res.json({ msg: 'Ooops! Passwords must have more than 8 characters' })
    } else {
      usersModel.find((err, users) => { /** move this to own function during refactor */
        if (err) {
          console.log(err)
          res.json({ msg: 'Ooops! An error occured' })
        } else {
          var userExists = users.some((user) => {
            return user.username === R.trim(userObj.name) && user.password === R.trim(userObj.password)
          }) /** return true if username and password found */
          if (userExists) {
            res.json({ msg: 'Successful logged in!' })
          } else {
            res.json({ msg: 'Ooops! username or password do not match' })
          }
        }
      })
    }
  },
  miniSave: function (users, name, email, password, res) { /** save data to MongoDB */
    users.username = R.trim(name)
    users.password = R.trim(password)
    users.email = R.trim(email)

    const isError = (err) => {
      if (err) {
        res.json({msg: err.message})
      }
    }

    users.save(isError) /** first class function. FP Hurrah!! */
  },
  save: function (usersModel, UserMInstance, userObj, res) {
    usersModel.find((err, users) => { /** move this to own function during refactor */
      var email = R.trim(userObj.email)
      if (err) {
        console.log(err)
      } else {
        var userExists = users.some((user) => {
          return user.email === email
        }) /** return true if username found */
        if (userExists) {
          res.json({ msg: 'Ooops! This email address is in use!' })
        } else {
          this.miniSave(UserMInstance, userObj.name, userObj.email, userObj.password, res) /**
          * save users to mongoDB via MLab if all edge-cases pass
          */
          var token = this.generateToken(email)
          res.json({
            msg: 'Welcome ' + userObj.name,
            token: token
          })
        }
      }
    })
  },
  generateToken: function (email) {
    var _payload = {data: email}
    var token = jwt.sign(_payload, _secret)
    return token
  },
  verifyToken: function (token, res) {
    jwt.verify(token, _secret, (err, decodedToken) => {
      if (err) {
        res.json({ msg: err })
      } else {
        res.json({ msg: 'success' })
      }
    })
  }
}
