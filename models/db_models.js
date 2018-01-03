/** Mongoose ORM db models */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

let usersSchema = new Schema({
  username: String,
  email: String,
  password: String
})

let groupSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: String,
  members: [{ email: String }]
})

let messageSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  _groupid: { type: Schema.Types.ObjectId, ref: 'Groups' },
  _content: String
})

module.exports = {
  Users: mongoose.model('Users', usersSchema),
  Groups: mongoose.model('Groups', groupSchema),
  Messages: mongoose.model('Messages', messageSchema)
}
