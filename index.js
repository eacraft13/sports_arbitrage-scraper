var config = require('./config');
var covers = require('./bin/covers');



setInterval(function() {
    covers(config, function(err) {
        if (err) console.log(err);
        else console.log('Successfully scraped covers...');
    });
}, config.timer);
