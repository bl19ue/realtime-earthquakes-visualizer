var express = require('express');
var router = express.Router();
var restClient = require('unirest');

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.Client(),
    producer = new HighLevelProducer(client);

var startSend = false;

producer.createTopics(['earthquakes'], false, function (err, data) {
    console.log(data);
});

var usgs = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

var attrib = {
    and         : '&',
    equals      : '=',
    starttime   : 'starttime',
    endtime     : 'endtime'
};

var ten_secs = 10000;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/fetch', function(req, res) {
    var i=0;
    while(i<5) {
        setTimeout(callUsgs, ten_secs);
        i++;
    }
    res.json("Request sent");
});

function callUsgs() {
    var endtime = new Date();
    var starttime = new Date(endtime);
    starttime.setMinutes(endtime.getSeconds() - ten_secs);

    starttime = starttime.toISOString();
    endtime = endtime.toISOString();

    var url =
        attrib.and
        + attrib.starttime
        + attrib.equals
        + starttime
        + attrib.and
        + attrib.endtime
        + attrib.equals
        + endtime;

    url = usgs + url;

    restClient.get(url).end(handleUsgsResponse);
}

var payloads = [
    { topic: 'earthquakes', messages: '', partition: 0 }
];

function handleUsgsResponse(response) {
    if(response.status === 200) {
        if(startSend) {
            payloads[0].messages = JSON.stringify(response.body);
            producer.send(payloads, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Data successfully sent at " + new Date().toISOString());
                }
            });
        }
    }
}


producer.on('ready', function(){
    console.log("Kafka producer ready");
    startSend = true;
});

producer.on('error', function(err){
    console.log("Kafka producer error " + err);
    startSend = false;
});

//process.on('uncaughtException', function(err) {
//    console.log("Error:" + err);
//});

module.exports = router;
