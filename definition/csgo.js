module.exports = function() {
    return {
        launch: [{
            // https://nodejs.org/api/os.html#os_os_platform
            os: 'win32',
            command: 'srcds.exe',
        }, {
            os: 'linux',
            command: 'srcds_run',
        }],

        args: [{
            name: 'game',
            type: 'fixed',
            arg: ['-game', 'csgo'],
        }, {
            name: 'console',
            type: 'fixed',
            arg: '-console'
        }, {
            name: 'enable RCON',
            type: 'fixed',
            arg: '-usercon',
        }, {
            name: 'port',
            type: 'portNumber',
            arg: '-port',
        }, {
            name: 'tickrate',
            type: 'fixed',
            arg: ['-tickrate', '128'],
        }, {
            name: 'mode',
            type: 'select',
            values: [{
                name: 'Classic Casual',
                default: true,
                arg: ['+game_type', '0', '+game_mode', '0'],
            }, {
                name: 'Classic Competitive',
                arg: ['+game_type', '0', '+game_mode', '1'],
            }, {
                name: 'Arms Race',
                arg: ['+game_type', '1', '+game_mode', '0'],
            }, {
                name: 'Demolition',
                arg: ['+game_type', '1', '+game_mode', '1'],
            }],
        }, {
            name: 'hostname',
            type: 'string',
            arg: '+hostname',
        }, {
            name: 'rcon',
            type: 'genString',
            arg: '+rcon_password'
        }, {
            name: 'password',
            type: 'genString',
            arg: '+sv_password'
        }, {
            name: 'bot quota',
            notes: 'set to 0 to disable bots',
            type: 'number',
            arg: '+bot_quota'
        }, {
            name: 'bot difficulty',
            type: 'select',
            values: [{
                name: 'easy',
                default: true,
                arg: ['+bot_difficulty', 0],
            }, {
                name: 'normal',
                arg: ['+bot_difficulty', 1],
            }, {
                name: 'hard',
                arg: ['+bot_difficulty', 2],
            }, {
                name: 'expert',
                arg: ['+bot_difficulty', 3],
            }],
        }, {
            name: 'authKey',
            type: 'keyPool',
            arg: '-authkey'
        }],

        // default?
        redirectStdio: true,

        query: 'valve'
    };
};
