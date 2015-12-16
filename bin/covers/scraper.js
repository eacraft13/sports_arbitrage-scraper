var async   = require('async');
var jsdom   = require('jsdom');
var moment  = require('moment-timezone');
var request = require('request');



module.exports = function(config, callback) {
    var matches = [];
    var urls    = config.urls;

    async.forEachOf(urls, function(url, key, callback) {
        jsdom.env(
            url,
            ['https://code.jquery.com/jquery-2.1.4.min.js'],
            function(err, window) {
                var $ = window.$;

                $('table > tbody > tr.bg_row').each(function() {
                    var time = $(this).find('.odds_table_row').first().find('.team_away').text().trim() + ' ' + $(this).find('.odds_table_row').first().find('.team_home').text().trim();
                    var match = {
                        sport: key,
                        teams: {
                            away: $(this).find('.team_away > strong').text().trim(),
                            home: $(this).find('.team_home > strong').text().trim().substr(1)
                        },
                        time: moment.tz(time, 'ddd, MMM D h:mm A', 'America/New_York').unix(),
                        lines: []
                    };

                    $(this).children('td.offshore_top').each(function(i) {
                        var away = $(this).find('.line_top > a').text().trim();
                        var home = $(this).find('.offshore > a').text().trim();

                        if (away === 'OFF')
                            return;
                        if (i === 0)
                            return;
                        if (i === 4)
                            return;
                        else
                            match.lines.push({
                                source: url,
                                odds: {
                                    away: { american: +away },
                                    home: { american: +home }
                                }
                            });
                    });

                    matches.push(match);
                });

                callback();
            }
        );
    }, function(err) {
        callback(err, matches);
    });
};



function indexToSource(index) {
    if (index === 0)
        return 'OPEN';
    else if (index === 1)
        return 'CarbonSports';
    else if (index === 2)
        return 'Sportsbook';
    else if (index === 3)
        return '5Dimes';
    else if (index === 4)
        return 'GTbets';
    else if (index === 5)
        return 'TopBet';
    else if (index === 6)
        return 'Westgate Las Vegas';
    else
        return null;

}
