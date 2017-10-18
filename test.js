const assert = require('assert');
const csgoProvider = require('./index');

const authkey = '-authkey';
const key1 = 'key-1';
const key2 = 'key-2';

const csgo = csgoProvider({
    workingDir: '/',
    keyPool: [key1, key2],
});

const lobby = { name: 'name', mode: 'Demolition' };

const args1 = csgo.getArgs({ lobby, port: 9000 });
assert.ok(args1.includes(authkey));
assert.ok(args1.includes(key1));
assert.ok(!args1.includes(key2));

const args2 = csgo.getArgs({ lobby, port: 9001 });
assert.ok(args2.includes(authkey));
assert.ok(!args2.includes(key1));
assert.ok(args2.includes(key2));

const args3 = csgo.getArgs({ lobby, port: 9002 });
assert.ok(!args3.includes(authkey));
assert.ok(!args3.includes(key1));
assert.ok(!args3.includes(key2));

csgo.onDestroy({ lobby, port: 9001 });

const args4 = csgo.getArgs({ lobby, port: 9001 });
assert.ok(args4.includes(authkey));
assert.ok(!args4.includes(key1));
assert.ok(args4.includes(key2));
