//load the connectDB.js file
//now we have a centralize file to run queries against our database.
var db = require('connectDB.js');

//expose the getEmployee method
module.exports.getEmployee = getEmployee;

function getEmployee(id, callback) {
    //create query to run
    var query = "SELECT e.id, " +
        "concat_ws(' ', e.firstname::text, e.lastname::text) as fullname, " +
        "e.email, e.phone, e.createdon, e.updatedon " +
        "FROM Employee e " +
        "WHERE e.id = $1";

    //create array for parameters to be used in the PostgreSQL script above
    var params = [id];

    //access the pgRun method from the
    // db variable (remember in the beginning of the file we loaded the connectDB.js into this variable)
    //create an object and pass the variables to the corresponding property names query:query, etc
    db.pgRun({query: query, params: params, insertUpdate: false}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, {status: "OK", data: {rows: result.rows}});
        }
    });
}