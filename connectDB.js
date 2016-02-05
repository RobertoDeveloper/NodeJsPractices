//load module node-postgres
var postgre = require('pg');

//expose the function pgRun in order to run queries against your postgres database
module.exports = {
    pgRun: pgRun
};

function pgRun(runObject, callback) {
    postgre.connect(getConnectionString(), function(err, client, done) {
        client.query(runObject.query, function(err, res) {
            if(err) {
                if(runObject.insertUpdate) {
                    client.query('ROLLBACK', function(err) {
                        done(err);
                    });
                }else {
                    done();
                }
                callback(err);
            }else if(res) {
                if(runObject.insertUpdate) {
                    client.query('COMMIT', done);
                }else {
                    done();
                }
                callback(null, res);
            }else {
                //fallback / you can handle this as you wish.
                callback({err:'error'})
            }
        });
    });
}

function getConnectionString() {
    return {
        user: "YOUR_USER_ACCOUNT",
        password: "YOUR_PASSWORD",
        database: "YOUR_DATABASE",
        port: 0, //YOUR_PORT
        host: "xxx-xxx-xx-xxx-xx.xxxxxx-x.amazonaws.com",
        ssl: true
    };
}


