/** ORM db models */

var mongoose = require('mongoose')
var Schema = mongoose.Schema()

var usersSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  email_address: String,
  password: String
//   groups: [{ type: Schema.Types.ObjectId, ref: 'Groups' }],
//   messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }]
})

var groupSchema = new Schema({
//   _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
//   messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }],
  groupid: Schema.Types.ObjectId,
  members: String
})

var messageSchema = new Schema({
//   _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
//   _group: { type: Schema.Types.ObjectId, ref: 'Groups' },
  message_id: Schema.Types.ObjectId,
  message: String
})

module.exports = {
  Users: mongoose.model('Users', usersSchema),
  Groups: mongoose.model('Groups', groupSchema),
  Messages: mongoose.model('Messages', messageSchema)
}
