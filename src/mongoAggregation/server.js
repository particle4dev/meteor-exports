var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));

aggregates = (function () {
    var mongoDriver = MongoInternals.defaultRemoteCollectionDriver().mongo;
    return function (collectionName, pipeline) {
        var future = new Future();
        
        // https://github.com/meteor/meteor/blob/40ec4760f049b3a312b6b228aa4bf08f91f241aa/packages/mongo/mongo_driver.js#L240
        var collection = mongoDriver.rawCollection(collectionName);

        collection.aggregate(pipeline, function (err, docs) {
            if (err) {
                future.
                throw (err);
                return;
            } else {
                future.
                return (docs);
            }
        });
        return future.wait();
    }
})();