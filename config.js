var moment = require('moment');

module.exports = {
    timer: 1000 * 60 * 8, // 8 minutes
    ttl: moment().add(8, 'minutes').unix(),
    url: 'http://api.delphi.website'
};
