var covers = require('./bin/covers');



covers(function(err, matches) {
    console.log(JSON.stringify(matches, null, 3));
});
