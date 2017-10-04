const { source } = require('l4n-query');

const headline = `# Counter-Strike: Global Offensive
[buy it on steam](http://store.steampowered.com/app/730/CounterStrike_Global_Offensive/)\n\n`;
const publicComp = `## Classic: Competitive
This is the classic gameplay that made Counter-Strike famous.
Queue up and join a 5v5 best-of-30 match using standard competitive Counter-Strike rules on one of the classic maps.
You can join a match on your own, or form a team and enter a match as a unit.`;
const publicCasual = `## Classic: Casual
Ready to play some Counter-Strike, but don't want to commit to a full match?
Find a casual match and play at your own pace.
In Casual mode, players automatically receive body armor and defusal kits and gain bonus rewards for kills.`;
const publicDemo = `## Demolition
In demolition mode, players take turns attacking and defending a single bombsite in a series of maps designed for fast-paced gameplay.
Players are automatically granted a starting weapon, and advance through a sequence of firearms when they register a kill.
If you’re up to the challenge, you can try to register a kill each round and reach the ultimate weapons, powerful sniper rifles!`;
const publicGungame = `## Arms Race
Arms race is a gun-progression mode featuring instant respawning and a ton of close-quarter combat.
Players gain new weapons immediately after registering a kill as they work their way through each weapon in the game.
Get a kill with the final weapon, a golden knife, and win the match.`;


const modes = [{
    id: 'casual',
    name: 'Classic Casual',
    lobby: { minPlayers: 4, maxPlayers: 20, publicInfo: headline + publicCasual },
    args: ['+game_type', '0', '+game_mode', '0', '+mapgroup', 'mg_active', '+map', 'de_dust2'],
}, {
    id: 'comp',
    name: 'Classic Competitive',
    lobby: { minPlayers: 5, maxPlayers: 10, publicInfo: headline + publicComp },
    args: ['+game_type', '0', '+game_mode', '1', '+mapgroup', 'mg_active', '+map', 'de_dust2'],
}, {
    id: 'gungame',
    name: 'Arms Race',
    lobby: { minPlayers: 2, maxPlayers: 10, publicInfo: headline + publicGungame },
    args: ['+game_type', '1', '+game_mode', '0', '+mapgroup', 'mg_armsrace', '+map', 'ar_shoots'],
}, {
    id: 'demo',
    name: 'Demolition',
    lobby: { minPlayers: 2, maxPlayers: 10, publicInfo: headline + publicDemo },
    args: ['+game_type', '1', '+game_mode', '1', '+mapgroup', 'mg_demolition', '+map', 'de_lake'],
}];

function getArgs({ lobby, port }) {
    const { args: dynArgs } = modes.find(mode => mode.name === lobby.mode);
    return [
        '-game', 'csgo',
        '-console', '-usercon',
        '+hostname', lobby.name,
        '+hostport', port,
    ].concat(dynArgs);
}

module.exports = ({ workingDir, keyPool }) => ({
    servers: modes.map(mode => ({
        id: `csgo-${mode.id}`,
        lobby: {
            game: 'Counter-Strike: Global Offensive',
            mode: mode.name,
            ...mode.lobby,
        }
    })),
    portRange: [27000, 27100],
    getArgs,
    command: {
        win32: 'srcds.exe',
        linux: 'srcds_run',
    },
    options: {
        cwd: workingDir,
        stdio: 'inherit',
    },
    query: source,
});
