const path = require('path');
const loadConfig = require('./loadConfig');

const lobbyDefinition = {
    mode: {
        type: 'select',
        required: true,
        values: [{
            name: 'Classic Casual',
            args: ['+game_type', '0', '+game_mode', '0'],
        }, {
            name: 'Classic Competitive',
            args: ['+game_type', '0', '+game_mode', '1'],
        }, {
            name: 'Arms Race',
            args: ['+game_type', '1', '+game_mode', '0'],
        }, {
            name: 'Demolition',
            args: ['+game_type', '1', '+game_mode', '1'],
        }]
    },
    hostname: {
        type: 'string',
        args: ['+hostname'],
    },
    rcon: {
        type: 'string',
        args: ['-usercon', '+rcon_password']
    },
    password: {
        type: 'string',
        args: ['+sv_password']
    },
    botQuota: {
        notes: 'set to 0 to disable bots',
        type: 'number',
        args: ['+bot_quota']
    },
    botDifficulty: {
        type: 'select',
        values: [{
            name: 'easy',
            default: true,
            args: ['+bot_difficulty', 0],
        }, {
            name: 'normal',
            args: ['+bot_difficulty', 1],
        }, {
            name: 'hard',
            args: ['+bot_difficulty', 2],
        }, {
            name: 'expert',
            args: ['+bot_difficulty', 3],
        }],
    }
};

function getLobbyDefinition({ workingDir }) {

    const gameModesPath = path.resolve(workingDir, 'csgo/gamemodes.txt');
    const gameModes = loadConfig(gameModesPath);

    const gameModesServerPath = path.resolve(workingDir, 'csgo/gamemodes_server.txt');
    const gameModesServer = loadConfig(gameModesServerPath);

    const mapgroups = Object.assign(gameModes.mapgroups, gameModesServer.mapgroups);

    const mapgroupValues = Object.keys(mapgroups)
        .filter(mapgroup => Object.keys(mapgroups[mapgroup].maps).length)
        .map(mapgroup => ({
            name: mapgroup,
            args: ['+mapgroup', mapgroup]
        }));

    return Object.assign({}, lobbyDefinition, {
        mapGroup: {
            type: 'select',
            values: mapgroupValues
        }
    });
};

module.exports = getLobbyDefinition;
