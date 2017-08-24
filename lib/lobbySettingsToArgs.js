
function mapToValue(lobbyDefinitionItem, lobbySettingValue) {
    switch (lobbyDefinitionItem.type) {
        case 'number':
        case 'string':
            return lobbyDefinitionItem.concat([lobbySettingValue]);

        case 'select':
            return lobbyDefinitionItem.values.find(v => v.name === lobbySettingValue).args;
    }
}


function lobbySettingsToArgs(lobbySettings, generator) {
    const args = Object.keys(lobbySettings)
        .filter(name => lobbyDefinition[name])
        .map(name => [name].concat(lobbySettings[name]))
        .reduce((prev, curr) => prev.concat(curr));

    return [
        '-game', 'csgo',
        '-console',
        '-tickrate', '128'
    ].concat([
        '-port', generator.get('port', 'number', [26900, 27100])
    ]).concat(args);
}

module.exports = lobbySettingsToArgs;
