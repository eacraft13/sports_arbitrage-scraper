var _            = require('lodash');
var async        = require('async');
var coversConfig = require('./config');
var scraper      = require('./scraper');
var request      = require('request');
var slug         = require('slug');



module.exports = function(config, callback) {
    var url = config.url;

    scraper(coversConfig, function(err, matches) {
        if (err) return callback(err);

        async.each(matches, function(match, callback) {
            // Create matches
            request({
                uri: url + '/matches',
                method: 'POST',
                body: _.pick(match, [ 'sport', 'teams', 'time' ]),
                json: true
            }, function(err, data) {
                if (err) return callback(err);
                var id = [ slug(match.sport).toLowerCase(), slug(match.teams.away).toLowerCase(), slug(match.teams.home).toLowerCase(), +match.time ];
                // Create lines
                async.each(match.lines, function(line, callback) {
                    request({
                        uri: url + '/matches/' + id.join('/') + '/lines',
                        method: 'POST',
                        body: _.assign(line, { ttl: config.ttl }),
                        json: true
                    }, function(err, data) {
                        callback(err);
                    });
                }, function(err) {
                    callback(err);
                }); // end lines
            }); // end matches

        }, function(err) {
            callback(err);
        });
    });

};
