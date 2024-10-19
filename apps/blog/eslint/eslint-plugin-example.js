const fooBarRule = require('./enforce-foo-bar');
const noAsyncAndSyncImport = require('./no-global-exists-both-async-and-sync-import');

const plugin = { rules: { 'enforce-foo-bar': fooBarRule, 'no-async-and-sync-import': noAsyncAndSyncImport } };
module.exports = plugin;
