const lobbyDefinition = require('./lib/getLobbyDefinition');
const lobbySettingsToArgs = require('./lib/lobbySettingsToArgs');
const query = require('./lib/query');

module.exports = function({ workingDir, keyPool }) {
    return {
        definition: {
            id: 'csgo',
            steamId: 730,
            name: 'Counter-Strike: Global Offensive',
        },
        launch: {
            win32: 'srcds.exe',
            linux: 'srcds_run',
        },
        workingDir,
        lobbyDefinition: lobbyDefinition({ workingDir }),
        lobbySettingsToArgs,
        query,
    };
};
