var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));

var default_collection = '__mapreduce';

/** 
 * Run map reduce
 * 
 * @param {String}      collectionName
 * @param {Function}    map
 * @param {Function}    reduce
 * @param {Object}      options
 * @return {Array}      Result of map reduce
 **/
mapreduce = (function () {
    var mongoDriver = MongoInternals.defaultRemoteCollectionDriver().mongo;
    return function (collectionName, map, reduce, options) {
        if(!options)
            options = {};
        if(!options.out)
            options.out = default_collection;

        var selectionQuery = {};
        var optionsQuery = {};
        if(options.out.sort) {
            optionsQuery['sort'] = options.out.sort;
            options.out.sort = null;
            delete options.out.sort;
        }
        if(options.out.limit) {
            optionsQuery['limit'] = options.out.limit;
            options.out.limit = null;
            delete options.out.limit;
        }

        var future = new Future();
        var collection = mongoDriver._getCollection(collectionName);

        collection.mapReduce(map, reduce, options, function (err, collection, stats) {
            if (err) {
                future.
                throw (err);
                return;
            } else {
                // http://docs.mongodb.org/manual/reference/command/mapReduce/#mapreduce-out-cmd
                if(options.out.merge)
                    var collection2 = mongoDriver._getCollection(options.out.merge);
                else if(options.out.replace)
                    var collection2 = mongoDriver._getCollection(options.out.replace);
                else
                    var collection2 = mongoDriver._getCollection(options.out);

                collection2.find(selectionQuery, optionsQuery, function (err, docs) {
                    if (err)
                        future
                        .throw (err);
                    docs.toArray(function(err, results) {
                        if (err) 
                            future
                            .throw (err);
                        future
                        .return (results);
                    });
                });
            }
        });
        return future.wait();
    }
})();