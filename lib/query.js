const GameDig = require('gamedig');
const debug = require('debug')('l4n:provider:csgo:query');

const query = (port) => {
    return Gamedig.query({
        type: 'csgo',
        host: '127.0.0.1',
        port
    }).then((response) => {
        debug(response);
    });
};

module.exports = query;
