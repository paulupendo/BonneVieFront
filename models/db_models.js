/** Mongoose ORM db models */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var usersSchema = new Schema({
  username: String,
  email: String,
  password: String,
  groups: [{ type: Schema.Types.ObjectId, ref: 'Groups' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }]
})

var groupSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }],
  name: String,
  members: [{ email: String }]
})

var messageSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  _group: { type: Schema.Types.ObjectId, ref: 'Groups' },
  message: String
})

module.exports = {
  Users: mongoose.model('Users', usersSchema),
  Groups: mongoose.model('Groups', groupSchema),
  Messages: mongoose.model('Messages', messageSchema)
}
