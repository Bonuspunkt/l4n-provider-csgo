const debug = require('debug')('l4n:provider:csgo:generteString');
const pool = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function getChar(number) {
    number = Math.floor(number);

    if (number === 0) { return ''; }

    const index = number % pool.length;
    return getChar((number - index) / pool.length) + pool[index];
}

function generateString() {
    const number = Math.floor(Math.random() * 1e17 + Date.now());

    const result = getChar(number);
    debug(result);
    return result;
}

module.exports = generateString;
