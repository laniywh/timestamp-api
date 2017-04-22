var express = require('express');
var moment = require('moment');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/:input', function (req, res) {

    var string = req.params.input;
    var date;

    if (!string.match(/\D/) && (date = moment.utc(string, 'X')).isValid()) {

        res.json({
            "unix": parseInt(date.format('X')),
            "natural": date.format('MMMM DD, YYYY')
        });

    } else if((date = moment.utc(string, 'MMMM DD, YYYY')).isValid()) {

        res.json({
            "unix": parseInt(date.format('X')),
            "natural": date.format('MMMM DD, YYYY')
        });

    } else {
        res.json({
            "unix": null,
            "natural": null
        });
    }
});

app.listen(port);