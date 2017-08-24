const fs = require('fs');
const debug = require('debug')('l4n:provider:csgo:loadConfig');
const { parse } = require('./parser');

const loadConfig = (filePath) => {
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return parse(fileContent);
    }
    return {};
};

module.exports = loadConfig;
