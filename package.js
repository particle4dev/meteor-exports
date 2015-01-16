Package.describe({
    summary: "exports some private function",
    version: "1.1.1",
    name: "particle4dev:exports",
    git: "https://github.com/particle4dev/meteor-exports.git"
});

var client    = ['client'],
server        = ['server'],
both          = ['server', 'client'];

Package.onUse(function(api) {
    api.versionsFrom('METEOR@0.9.1.1');

    api.use(['underscore', 'mongo'], both);
    api.use('accounts-base');

    api.use('blaze');
    //api.imply("blaze");

    // users online
    api.addFiles('src/usersOnline/common.js', both);
    api.addFiles('src/usersOnline/client.js', client);
    api.addFiles('src/usersOnline/server.js', server);
    api.addFiles('src/usersOnline/message.js', both);
    // aggregation 
    api.addFiles('src/mongoAggregation/server.js', server);
    // map reduce 
    api.addFiles('src/mongoMapreduce/server.js', server);

    // index
    api.addFiles('src/mongoIndex.js', server);

    // blaze
    api.addFiles('src/blaze/client.js', client);

    //exports
    api.export('aggregates', server);
    api.export('mapreduce', server);
    api.export('MongoIndex', server);

    // user online
    api.export('isUserOnline', server);

    //blaze
    api.export('_toText', client);
});

Package.onTest(function(api) {
    api.use(['tinytest', 'test-helpers', 'mongo', 'particle4dev:exports']);
    api.addFiles('tests/mongoAggregation/tests.js', server);
    api.addFiles('tests/blaze/tests.js', client);
});
