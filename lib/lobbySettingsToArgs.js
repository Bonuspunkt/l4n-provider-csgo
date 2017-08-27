
function mapToValue(lobbyDefinitionItem, lobbySettingValue) {
    switch (lobbyDefinitionItem.type) {
        case 'number':
        case 'string':
            return lobbyDefinitionItem.concat([lobbySettingValue]);

        case 'select':
            return lobbyDefinitionItem.values.find(v => v.name === lobbySettingValue).args;
    }
}


function lobbySettingsToArgs(lobbySettings, generate) {
    const args = Object.keys(lobbySettings)
        .filter(name => lobbyDefinition[name])
        .map(name => [name].concat(lobbySettings[name]))
        .reduce((prev, curr) => prev.concat(curr));

    return [
        '-game', 'csgo',
        '-console',
        '-tickrate', '128',
        '-port', generator('port', 'number', { min: 26900, max: 27100 }),
        '-usercon', '+rcon_password', generate('rcon', 'string', { length: 4 }),
        '+sv_password', generate('password', 'string', { length: 8 }),
    ].concat(args);
}

module.exports = lobbySettingsToArgs;
