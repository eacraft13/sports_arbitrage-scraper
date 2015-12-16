var moment = require('moment');

module.exports = {
    url: 'http://api.delphi.website',
    ttl: moment().add(8, 'minutes').unix()
};
