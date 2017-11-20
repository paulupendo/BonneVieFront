/**
 * BASE SETUP
 * ============================================
 */
var _config = require('../config')
var express = require('express')
var app = express() /** defines the app using express */
var bodyparser = require('body-parser')
var router = express.Router() /** get an instance of express router */
var port = process.env.port || 8080
var mongoose = require('mongoose')

app.use(bodyparser.urlencoded({extended: true})) /**
 * Returns middleware that only parses urlencoded bodies.
 * With the extended option set to true this will accept key value pairs of any type
 * If extended option is setto false it will accept key value pairs only as string or array
 */
app.use(bodyparser.json()) /** Return middleware that only parses Json */
router.get('/', (req, res) => {
  return res.json({message: 'Wup wup you just awoke yuri'})
})
router.use('/auth', require('./authRoutes'))
router.use(require('./groupRoutes')) /**
 * register separated routes
 */
app.use('/api/', router) /** register routes */
app.listen(port, () => {
  console.log('Yuri is live on port: ' + port)
})

mongoose.connect(_config.URI, {useMongoClient: true}, err => {
  err && console.log(err.message)
}) /** create connection to mongoDB via Mlab */
