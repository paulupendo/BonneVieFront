/** Mongoose ORM db models */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var usersSchema = new Schema({
  username: String,
  email: String,
  password: String
})

var groupSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: String,
  members: [{ email: String }]
})

var messageSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  _groupid: { type: Schema.Types.ObjectId, ref: 'Groups' },
  _content: String
})

module.exports = {
  Users: mongoose.model('Users', usersSchema),
  Groups: mongoose.model('Groups', groupSchema),
  Messages: mongoose.model('Messages', messageSchema)
}
