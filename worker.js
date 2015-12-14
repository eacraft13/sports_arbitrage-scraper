var _       = require('lodash');
var async   = require('async');
var covers  = require('./bin/covers');
var request = require('request');
var slug    = require('slug');



covers(function(err, matches) {
    var url = 'http://www.delphi.website';

    async.each(matches, function(match, callback) {
        request({
            uri: url + '/matches',
            method: 'POST',
            body: _.pick(match, [ 'sport', 'teams', 'time' ]),
            json: true
        }, function(err, data) {
            var id = [ slug(match.sport).toLowerCase(), slug(match.teams.away).toLowerCase(), slug(match.teams.home).toLowerCase(), +match.time ];
            async.each(match.lines, function(line, callback) {
                request({
                    uri: url + '/matches/' + id.join('/') + '/lines',
                    method: 'POST',
                    body: line,
                    json: true
                }, function(err, data) {
                    callback(err);
                });
            }, function(err) {
                callback(err);
            });
        });
    });
});
