/**
 http://runnable.com/UW3tymTkq498AACA/create-an-index-in-mongodb-using-mongodb-native-for-node-js
 
 Examples

    var indexName = MongoIndex.createIndex('matchingScore', [ ['profileId', 1] ]);
    console.log(indexName);

    var info = MongoIndex.indexInformation('matchingScore');
    console.log(info);

    var result = MongoIndex.dropIndex('matchingScore', 'profileId_1');
    console.log(result);

    var info = MongoIndex.indexInformation('matchingScore');
    console.log(info);
 */
var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));

MongoIndex = (function(){
    var mongoDriver = MongoInternals.defaultRemoteCollectionDriver().mongo;

    return {
        createIndex: function (collectionName, options) {
            var future = new Future();
            var collection = mongoDriver._getCollection(collectionName);

            collection.createIndex(options, function (err, indexName) {
                if (err)
                    future
                    .throw (err);
                future
                .return (indexName);
            });
            return future.wait();
        },
        indexInformation: function (collectionName) {
            var future = new Future();
            var collection = mongoDriver._getCollection(collectionName);

            collection.indexInformation(function(err, doc) {
                if (err)
                    future
                    .throw (err);
                future
                .return (doc);
            });
            return future.wait();
        },
        dropIndex: function (collectionName, options) {
            var future = new Future();
            var collection = mongoDriver._getCollection(collectionName);

            collection.dropIndex(options, function(err, result) {
                if (err)
                    future
                    .throw (err);
                future
                .return (result);
            });
            return future.wait();
        }
    };    
})();