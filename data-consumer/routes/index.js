var express = require('express');
var router = express.Router();
//
//var kafka = require('kafka-node'),
//    Consumer = kafka.Consumer,
//    client = new kafka.Client(),
//    consumer = new Consumer(
//        client,
//        [
//            { topic: 'earthquakes', partition: 0 }
//        ],
//        {
//            autoCommit: false
//        }
//    );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//consumer.on('message', function(body) {
//    console.log("Consuming " + body);
//});
//
//consumer.on('error', function(err) {
//    console.log("Kafa consumer error" + err);
//});
//
//consumer.on('offsetOutOfRange', function (err) {
//    console.log('offset out of range:' + err);
//});

//process.on('uncaughtException', function(err) {
//    console.log("Error:" + err);
//});

module.exports = router;
