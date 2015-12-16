var config = require('./config');
var covers = require('./bin/covers');



covers(config, function(err) {
    if (err) throw err;
    console.log('Successfully scraped covers...');
});
