const getLobbyDefinition = require('./lib/getLobbyDefinition');
const spawnServer = require('./lib/spawnServer');

module.exports = {
    getLobbyDefinition,
    spawn: spawnServer
};

const config = getLobbyDefinition({ workingDir: 'E:/SteamCMD/servers/csgo' });
console.log(config);
