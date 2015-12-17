#!/usr/bin/env node
var config = require('./config');
var covers = require('./bin/covers');



covers(config, function(err) {
    if (err) console.log(err);
    else console.log('Successfully scraped covers...');
});
