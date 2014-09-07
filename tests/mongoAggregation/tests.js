var Students = new Mongo.Collection('students');

testAsyncMulti("Mongo Aggregation", [
    function () {
        // insert data
        Students.remove({});
        [{
            _id : "jane",
            joined : new Date("2011-03-02"),
            likes : ["golf", "racquetball"]
        },
        {
            _id : "joe",
            joined : new Date("2012-07-02"),
            likes : ["tennis", "golf", "swimming"]
        }]
        .forEach(function (student) {
            Students.insert(student);
        });
    },
    function (test, expect) {
        var data = aggregates('students', [
            { $project : { name:{$toUpper:"$_id"} , _id:0 } },
            { $sort : { name : -1 } }
        ]);
        var dataExpect = [
            'JOE',
            'JANE'
        ]; i = 0;
        data.forEach(function (s) {
            test.equal(s.name, dataExpect[i]);
            i++;
        });
    }]
);