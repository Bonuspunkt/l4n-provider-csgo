const { spawn } = require('child_process');
const os = require('os');
const debug = require('debug')('l4n:provider:csgo:spawnServer');

function spawnServer({ workingDir, lobbyConfig }) {
    const osName = os.platform();
    const launch = csgo.launch.filter(launch => launch.os === osName);

    if (!launch) { return Promise.reject(Error('os not supported')) }

    const args = csgo.args.map(arg => {
        switch (arg.type) {
            case 'fixed':
                return arg.arg;
            case 'portNumber':
                return [arg.arg, getPort()];
            case 'genString':
                return [arg.arg, getString()];
            case 'keyPool':
                return getKey();
            default:
                return lobbyConfig[arg.name];
        }
    }).reduce((prev, curr) => {
        if (!Array.isArray(curr)) { curr = [curr]; }
        return prev.concat(curr);
    });

    const server = spawn(launch.command, args, {
        cwd: workingDir,
        stdio: 'pipe',
    });

    server.on('error', (...args) => debug('error', ...args));
    server.on('exit', (...args) => debug('exit', ...args));

    return {
        rcon: rCon,
        process: server
    };
}

module.exports = spawnServer;
