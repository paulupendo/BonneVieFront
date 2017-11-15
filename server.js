/**
 * BASE SETUP
 * ============================================
 */

var express = require('express');
var app = express(); /** defines the app using express */
var bodyparser = require('body-parser');
var router = express.Router(); /**get an instance of express router */
var port = process.env.port || 8080;
var mongoose = require('mongoose');

app.use(bodyparser.urlencoded({extended: true})); /**
 * Retruns middleware that only parses urlencoded bodies. 
 * With the extended option set to true this will accept key value pairs of any type
 * If extended option is setto false it will accept key value pairs only as string or array
 */
app.use(bodyparser.json()); /** Return middleware that only parses Json */
router.get('/', (req, res)=>{
    res.json({message: 'Wup wup you just awoke yuri'});
})
app.use('/api', router); /**register routes */
app.listen(port, ()=> {
    console.log('Yuri is live on port: ' + port);
});

// mongoose.createConnection('mongodb://candyman:code4usall@ds259855.mlab.com:59855/postitdb', { useMongoClient: true });
mongoose.createConnection('mongodb://candyman:code4usall@ds259855.mlab.com:59855/postitdb');
