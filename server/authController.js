const R = require('ramda')

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
    const isEmptyString = R.pipe(
      R.defaultTo(''),
      R.trim,
      R.isEmpty
    ) /** use ramda fp for input validation */
    var emptyField = R.any(isEmptyString, [name, email, password, confirmPassword])
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
  userAuth: function (username, password) { /** signin credentials validator */
    return 'success'
  },
  save: function (users, name, email, password, res) { /** save data to MongoDB */
    users.username = name
    users.password = password
    users.email = email
    const isError = (err) => {
      if (err) {
        res.json({msg: err.message})
      } else {
        res.json({msg: 'Registration successful'})
      }
    }
    users.save(isError) /** first class function. FP Hurrah!! */
  }
}
