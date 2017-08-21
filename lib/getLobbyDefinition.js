const path = require('path');
const loadConfig = require('./loadConfig');
const excludes = require('./excludes');
const csgo = require('../definition/csgo')();

function getLobbyDefinition(gameConfig) {
    const { workingDir } = gameConfig;

    const gameModesPath = path.resolve(workingDir, 'csgo/gamemodes.txt');
    const gameModesServerPath = path.resolve(workingDir, 'csgo/gamemodes_server.txt');

    const gameModes = loadConfig(gameModesPath);
    const gameModesServer = loadConfig(gameModesServerPath);
    if (gameModesServer) {
        // merge gameModes
        Object.assign(gameModes.mapgroups, gameModesServer.mapgroups);
    }

    const mapgroupValues = Object.keys(gameModes.mapgroups)
        .filter(mapgroup => Object.keys(gameModes.mapgroups[mapgroup].maps).length)
        .map(mapgroup => ({
            name: mapgroup,
            arg: ['+mapgroup', mapgroup]
        }));

    return csgo.args
        .concat([{
            name: 'mapgroup',
            type: 'select',
            values: mapgroupValues
        }])
        .filter(arg => !excludes.includes(arg.type));
};

module.exports = getLobbyDefinition;
